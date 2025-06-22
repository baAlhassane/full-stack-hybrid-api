package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.users.jobber.Jobber;
import com.alhas.hybrid_api.users.provider.Provider;
import com.alhas.hybrid_api.users.user.authRessource.Authority;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityRepository;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityService;
import com.alhas.hybrid_api.users.user.authRessource.RegistrationRequest;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private static final String UPDATED_AT_KEY = "updated_at";
    private final AuthorityRepository authorityRepository;
    private final AuthorityService authorityService;

    private final PasswordEncoder passwordEncoder;

    Set<Authority> authorities=new HashSet<>();

    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository, AuthorityService authorityService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
          this.authorityRepository = authorityRepository;
        this.authorityService = authorityService;
        this.passwordEncoder = passwordEncoder;
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

        userRepository.save(user);
    }

    public void register(@Valid RegistrationRequest registrationRequest) {
    }
}

