package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import com.alhas.hybrid_api.picture.userPicture.UserPictureService;
import com.alhas.hybrid_api.users.user.authRessource.*;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import com.alhas.hybrid_api.websocket.notification.NotificationProducer;
import com.alhas.hybrid_api.websocket.notification.UserEvent;
import com.alhas.hybrid_api.users.jobber.Jobber;
import com.alhas.hybrid_api.users.provider.Provider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final String UPDATED_AT_KEY = "updated_at";
    private final AuthorityRepository authorityRepository;
    private final AuthorityService authorityService;
    private final UserPictureService userPictureService;
    private final UserMapper userMapper;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationProducer notificationProducer;

    Set<Authority> authorities=new HashSet<>();



    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, AuthorityService authorityService, UserPictureService userPictureService, UserMapper userMapper, AuthenticationManager authenticationManager, JwtService jwtService, PasswordEncoder passwordEncoder, NotificationProducer notificationProducer) {
        this.userRepository = userRepository;
          this.authorityRepository = authorityRepository;
        this.authorityService = authorityService;
        this.userPictureService = userPictureService;
        this.userMapper = userMapper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.notificationProducer = notificationProducer;
    }



    public Set<Authority> getUserRoles() {
//        System.out.println(" role1  "+ attributes.get(SecurityUtils.CLAIMS_NAMESPACE));
        return this.authorities;
    }

    public void setPasswordForEmail(String email, String password) {
        User user = userRepository.findOneByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + email));

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    public void registerUser(RegistrationRequest request) {
        Optional<User> optionalUser = userRepository.findOneByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            throw new EmailAlreadyUsedException("Email is already taken");
        }

        User user ;
        switch (request.getUserRole()) {
            case "JOBBER":
                user = new Jobber();
                break;
            case "PROVIDER":
                user = new Provider();
                break;
            default:
                user = new User(); // "USER" par défaut
        }

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setUserType(request.getUserRole());
       // NotificationProducer(KafkaTemplate<String, UserEvent > kafkaTemplate)



        userRepository.save(user);
        System.out.println("user.getUserType() :: "+user.getUserType());
        notificationProducer.sendRegistrationEvent(new UserEvent(request.getFirstname(), request.getEmail()));
    }

    @Transactional
    public UserDTO getUser(){
        String currentUserEmail = SecurityUtils.getCurrentUserEmail();
        //String email=principal.getUsername();

        User user=userRepository.findOneByEmail(currentUserEmail)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + currentUserEmail));

        return userMapper.mapUserToUserDTO(user);
    }

    @Transactional(readOnly = true) // Important pour accéder aux relations ou LOBs si nécessaire
    public LoginResponse authenticate(LoginRequest loginRequest) {
        // 1. Authentification
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // 2. Récupération des détails de l'utilisateur authentifié
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 3. Génération du Token JWT
        String jwtToken = jwtService.generateToken(userDetails);

        // 4. Récupération de l'entité User pour construire la réponse complète
        User user = userRepository.findOneByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + loginRequest.getEmail()));

        // 5. Construction de la réponse
        String fullName = user.getFirstname() + " " + user.getLastname();

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setEmail(user.getEmail());
        loginResponse.setFirstname(user.getFirstname());
        loginResponse.setLastname(user.getLastname());
        loginResponse.setUserType(user.getUserType());
        loginResponse.setToken(jwtToken);
        loginResponse.setUerfullname(fullName);


        // Optionnel : Si tu veux inclure l'avatar dès le login pour éviter l'erreur "undefined"
        if (user.getAvatar() != null) {
            // Tu peux mapper ici l'avatar vers ton DTO si ton LoginResponse le supporte
        }

        return loginResponse;
    }


    @Transactional
    public UserDTO updateUserAvatar(String email, MultipartFile file) throws IOException {
        // 1. Rechercher l'utilisateur
        User user = userRepository.findOneByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + email));

        // 2. Créer ou mettre à jour l'objet UserPicture
        // Si l'utilisateur a déjà un avatar, on le récupère pour le modifier, sinon on en crée un
        UserPicture userPicture = user.getAvatar();
        if (userPicture == null) {
            userPicture = new UserPicture();
        }

        // 3. Remplir les données binaires
        userPicture.setFile(file.getBytes());
        userPicture.setFileContentType(file.getContentType());
        userPicture.setName(file.getOriginalFilename());

        // 4. Lier l'image à l'utilisateur et sauvegarder
        user.setAvatar(userPicture);


        User savedUser = userRepository.save(user);

        // Retourner le DTO avec URL HTTP
        UserDTO dto = userMapper.mapUserToUserDTO(savedUser);
        if (dto.getUserPicture() != null) {
            dto.setUrl("http://localhost:8081/api/avatar/me");
        }

        // Grâce au CascadeType.ALL sur la relation dans l'entité User,
        // sauvegarder le user sauvegardera aussi la picture.
        return userMapper.mapUserToUserDTO(userRepository.save(user));
    }



    public void register(@Valid RegistrationRequest registrationRequest) {
    }


}

