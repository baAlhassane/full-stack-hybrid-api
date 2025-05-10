package com.alhas.hybrid_api.users.user.authRessource;

import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.User;
import com.alhas.hybrid_api.users.user.UserRepository;
import com.alhas.hybrid_api.users.user.UserService;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.management.remote.JMXAuthenticator;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Optional;
import org.slf4j.Logger;

@RestController
@RequestMapping("/api/hybrid-api/auth")
public class AuthResource {

    private final UserService userService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final ClientRegistration clientRegistration;


    private static final Logger log = LoggerFactory.getLogger(AuthResource.class);

    public AuthResource(UserService userService, UserMapper userMapper, UserRepository userRepository, ClientRegistrationRepository  registration) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.clientRegistration = registration.findByRegistrationId("auth0");
    }

    @GetMapping("/get-authenticated-user-auth0")
    public ResponseEntity<ReadUserDTO> getAuthenticatedUser(
            @AuthenticationPrincipal OAuth2User oAuth2User,
            @RequestParam(required = false) boolean forceRecync) {

        System.out.println("GET /get-authenticated-user hit");

        if( oAuth2User == null) {
            System.out.println("❌ Problème : oAuth2User est null !");
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);}

            else{
            userService.syncWithIdp(oAuth2User,forceRecync);// fait un SaveAndflush() pour enregistre les mis a jours dans la BD
             ReadUserDTO connectedUser= userService.getAuthentificationFromExistingUser();//On recupere l'utilisateur dans BD avec ses mis a jours
            System.out.println("connected user :    "+connectedUser);
            return new ResponseEntity<>(connectedUser, HttpStatus.OK);

        }
    }

    @PostMapping("/get-authenticated-user-login")
    public ResponseEntity<ReadUserDTO> getlogindUser(@RequestBody LoginRequest  logingRequest ){

    Optional<User> userOpt = userRepository.findOneByEmail(logingRequest.email());
        System.out.println("❌ Problème : System.out.println(/get-authenticated-user-login); !");
        System.out.println(logingRequest.email());
    if(userOpt.isPresent()) {
        User user = userOpt.get();
            return ResponseEntity.ok(userMapper.mapUserToReadUserDTO(userOpt.get()));
    }
    else {

//        User user = new User();
//        user.setEmail(logingRequest.email());
//        user.setFirstname(logingRequest.firstname());
//        user.setLastname(logingRequest.lastname());
//        user.setPassword(logingRequest.password());
//        userRepository.save(user);
//        return ResponseEntity.ok(userMapper.mapUserToReadUserDTO(user));
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
    }




//    @PostMapping("/logout-hybrid-api")
//    public ResponseEntity<Void> logout(HttpServletRequest servletRequest, HttpServletResponse response) throws IOException, ServletException {
//        String issuerUri = clientRegistration.getProviderDetails().getIssuerUri();
//        String origineUri = servletRequest.getHeader(HttpHeaders.ORIGIN);
//        String logoutUrl = MessageFormat.format("{0}v2/logout?client_id={1}&returnTo={2}",
//                issuerUri, clientRegistration.getClientId(), origineUri);
//        System.out.println( " logoutUrl " + logoutUrl);
////        servletRequest.logout();
//        servletRequest.getSession().invalidate(); // Invalide la session
//        SecurityContextHolder.clearContext();
//
//        //response.sendRedirect(logoutUrl); // Redirige immédiatement
//        return ResponseEntity.ok().build(); // Réponse vide car redirection
//    }





}
