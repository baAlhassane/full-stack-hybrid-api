package com.alhas.hybrid_api.users.user.authRessource;

import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import com.alhas.hybrid_api.users.user.*;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.validation.Valid;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/hybrid-api/auth")
public class AuthResource {

    private final UserService userService;


    private final UserRepository userRepository;
    private final JwtService jwtService; // Nécessaire pour générer le JWT
    private static final Logger log = LoggerFactory.getLogger(AuthResource.class);

    private final  AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public AuthResource(UserService userService
            , UserRepository userRepository, JwtService jwtService, AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService) {
        this.userService = userService;


        this.userRepository = userRepository;
        this.jwtService = jwtService;
        // this.clientRegistration = registration.findByRegistrationId("auth0");
        //this.jwtService = jwtService;

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }


    @GetMapping("/get-authenticated-user")
    public ResponseEntity<UserDTO> getUser (){
//        String currentUserEmail = SecurityUtils.getCurrentUserEmail();
//        String email=principal.getUsername();
//
//        User user=userRepository.findOneByEmail(currentUserEmail);

        return ResponseEntity.ok(userService.getUser());

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = userService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, "Email ou mot de passe incorrect", null));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new LoginResponse(null, "Erreur interne du serveur", null));
        }
    }




@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody
                                      @Valid RegistrationRequest registrationRequest) {
        String fullName =registrationRequest.getUserRole()+" "+ registrationRequest.getFirstname() + " " + registrationRequest.getLastname();
        System.out.println(fullName+ " registered successfully ");

        userService.registerUser(registrationRequest);
    return ResponseEntity.ok(new RegistrationResponse(true, fullName,"User registered successfully", registrationRequest.getUserRole()));
}


    @PatchMapping("/update-avatar")
    public ResponseEntity<UserDTO> updateAvatar(@RequestParam("avatar") MultipartFile file) {
        try {
            // 1. Récupérer l'email de l'utilisateur connecté via ton SecurityUtils
            String email = SecurityUtils.getCurrentUserEmail();

            // 2. Appeler le service pour la logique métier
            UserDTO updatedUser = userService.updateUserAvatar(email, file);

            System.out.println("  @PatchMapping(update-avatar)  updatedUser.setUserPictureDTO();      : " + updatedUser.getUserPicture().getFile().length);
            // 3. Retourner l'utilisateur mis à jour
            return ResponseEntity.ok(updatedUser);


        } catch (IOException e) {
            // Erreur lors de la lecture des bytes du fichier
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}
