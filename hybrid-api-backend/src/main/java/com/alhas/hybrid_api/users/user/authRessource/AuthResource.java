package com.alhas.hybrid_api.users.user.authRessource;

import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.User;
import com.alhas.hybrid_api.users.user.UserRepository;
import com.alhas.hybrid_api.users.user.UserService;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;

import jakarta.validation.Valid;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;
import org.slf4j.Logger;

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
@GetMapping("/")
    public String welcome() {
        return "Bienvenue sur l'API hybride ! Le backend fonctionne. Accédez aux endpoints comme /api/hybrid-api/auth/login";
    }

@PostMapping("/login")
public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest,  HttpServletRequest httpRequest) {
    System.out.println("Login successsss ");
    System.out.println("loginRequest = " + loginRequest.getEmail() + ", " + loginRequest.getPassword());

    System.out.println("Attempting login for loginRequest.getEmail(): " + loginRequest.getEmail());

    try {
        // 1. Authentification de l'utilisateur
        // C'est cette ligne qui utilise votre CustomUserDetailsService et PasswordEncoder
        System.out.println("Attempting login for try authenticationManager : "  );
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        // 2. Si l'authentification réussit, obtenez les UserDetails
        // authentication.getPrincipal() contient l'objet UserDetails retourné par votre CustomUserDetailsService
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        System.out.println("Attempting login for userDetails: " + userDetails);
        // 3. Générez le jeton JWT
        String jwtToken = jwtService.generateToken(userDetails);

        // 4. Si vous avez besoin de l'objet User complet pour la réponse (par exemple, pour son ID, nom, etc.)
        // Assurez-vous que l'email est le même que celui utilisé pour l'authentification
        User user = userRepository.findOneByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found after authentication: " + loginRequest.getEmail()));
        // Note: Une UsernameNotFoundException ici après une authentification réussie est très improbable
        // car l'utilisateur a déjà été trouvé par CustomUserDetailsService.

        // 5. Construisez la réponse avec le jeton JWT et d'autres infos utilisateur si nécessaire
        // Adaptez LoginResponse pour inclure le JWT et les informations de l'utilisateur
        String fullName=  user.getFirstname() + " " + user.getLastname();
        System.out.println(fullName+ " is logged successfully ");
         LoginResponse loginResponse = new LoginResponse();
         loginResponse.setEmail(user.getEmail());
         loginResponse.setFirstname(user.getFirstname());
         loginResponse.setLastname(user.getLastname());
         loginResponse.setUserRole(user.getUserType());
         loginResponse.setToken(jwtToken);
         loginResponse.setUerfullname(fullName);
        return ResponseEntity.ok(loginResponse);
        // Exemple: new LoginResponse(jwtToken, "Login successful", user.getEmail(), user.getFirstname(), user.getRoles(), etc.);

    } catch (BadCredentialsException ex) {
        // Gérer les informations d'identification incorrectes
        System.err.println("Login failed for " + loginRequest.getEmail() + ": " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(null, "Invalid email or password", null));
    } catch (UsernameNotFoundException ex) {
        // Gérer l'utilisateur non trouvé (peut être intercepté par BadCredentialsException selon la config Spring Security)
        System.err.println("User not found during login attempt: " + loginRequest.getEmail() + ": " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(null, "User not found", null));
    } catch (Exception ex) {
        // Gérer toute autre exception inattendue
        System.err.println("An unexpected error occurred during login: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponse(null, "An internal server error occurred", null));
    }
}



@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody
                                      @Valid RegistrationRequest registrationRequest) {
        String fullName =registrationRequest.getRole()+" "+ registrationRequest.getFirstname() + " " + registrationRequest.getLastname();
        System.out.println(fullName+ " registered successfully ");

        userService.registerUser(registrationRequest);
    return ResponseEntity.ok(new RegistrationResponse(true, fullName,"User registered successfully"));
}


}
