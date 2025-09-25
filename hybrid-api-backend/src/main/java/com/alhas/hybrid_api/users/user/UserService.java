package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.websocket.notification.NotificationProducer;
import com.alhas.hybrid_api.websocket.notification.UserEvent;
import com.alhas.hybrid_api.users.jobber.Jobber;
import com.alhas.hybrid_api.users.provider.Provider;
import com.alhas.hybrid_api.users.user.authRessource.Authority;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityRepository;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityService;
import com.alhas.hybrid_api.users.user.authRessource.RegistrationRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final String UPDATED_AT_KEY = "updated_at";
    private final AuthorityRepository authorityRepository;
    private final AuthorityService authorityService;

    private final PasswordEncoder passwordEncoder;
    private final NotificationProducer notificationProducer;

    Set<Authority> authorities=new HashSet<>();

    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, AuthorityService authorityService, PasswordEncoder passwordEncoder, NotificationProducer notificationProducer) {
        this.userRepository = userRepository;
          this.authorityRepository = authorityRepository;
        this.authorityService = authorityService;
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
        switch (request.getRole()) {
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
       // NotificationProducer(KafkaTemplate<String, UserEvent > kafkaTemplate)


        userRepository.save(user);
        notificationProducer.sendRegistrationEvent(new UserEvent(request.getFirstname(), request.getEmail()));
    }

    public void register(@Valid RegistrationRequest registrationRequest) {
    }
}

