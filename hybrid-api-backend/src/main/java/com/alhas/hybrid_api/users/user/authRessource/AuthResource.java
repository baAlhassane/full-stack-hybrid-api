package com.alhas.hybrid_api.users.user.authRessource;

import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.UserRepository;
import com.alhas.hybrid_api.users.user.UserService;
import com.alhas.hybrid_api.users.user.mapper.UserMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.MessageFormat;

@RestController
@RequestMapping("/api/hybrid-api/auth")
public class AuthResource {

    private final UserService userService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final ClientRegistration clientRegistration;

    public AuthResource(UserService userService, UserMapper userMapper, UserRepository userRepository, ClientRegistrationRepository  registration) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.clientRegistration = registration.findByRegistrationId("auth0");
    }

    @GetMapping("/get-authenticated-user")
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
