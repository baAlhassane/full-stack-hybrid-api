//// com.alhas.hybrid_api.users.user.authRessource.CustomOAuth2AuthenticationSuccessHandler.java
//package com.alhas.hybrid_api.users.user.authRessource;
//
//import com.alhas.hybrid_api.users.user.UserRepository;
//import com.alhas.hybrid_api.users.user.User;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
//import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService; // Importez ceci
//import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
//import org.springframework.security.oauth2.core.oidc.user.OidcUser;
//import org.springframework.security.oauth2.core.user.OAuth2User;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.io.IOException;
//import java.net.URI;
//import java.util.Map;
//
//@Component
//public class CustomOAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
//
//    private final UserRepository userRepository;
//    // private final JwtService jwtService; // Supprimez ceci si vous ne générez pas de nouveaux jetons
//    private final OAuth2AuthorizedClientService authorizedClientService; // Injectez ceci
//
//    public CustomOAuth2AuthenticationSuccessHandler(UserRepository userRepository, OAuth2AuthorizedClientService authorizedClientService) {
//        this.userRepository = userRepository;
//        this.authorizedClientService = authorizedClientService;
//        // this.jwtService = null; // Mettez à null ou supprimez du constructeur si non utilisé
//    }
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request,
//                                        HttpServletResponse response,
//                                        Authentication authentication) throws IOException, ServletException {
//
//        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//        String email = oAuth2User.getAttribute("email");
//
//        User user = userRepository.findOneByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur OAuth2 introuvable : " + email));
//
//        String auth0AccessToken = null;
//
//        // Récupérer le jeton d'accès Auth0 depuis le OAuth2AuthorizedClientService
//        if (authentication instanceof OAuth2AuthenticationToken oauth2Token) {
//            OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
//                    oauth2Token.getAuthorizedClientRegistrationId(),
//                    oauth2Token.getName()); // Le nom est généralement le nom du principal (email ou ID utilisateur)
//
//            if (authorizedClient != null && authorizedClient.getAccessToken() != null) {
//                auth0AccessToken = authorizedClient.getAccessToken().getTokenValue();
//            }
//        }
//
//        if (auth0AccessToken == null) {
//            System.err.println("ERREUR: Impossible de récupérer l'Access Token d'Auth0. Vérifiez la configuration OAuth2.");
//            // Gérez cette erreur de manière appropriée, par exemple, redirigez vers une page d'erreur
//            response.sendRedirect("http://localhost:4200/login?error=auth0_token_missing");
//            return;
//        }
//
//        // Maintenant, passez ce jeton d'accès Auth0 au frontend
//        String finalTokenToPass = auth0AccessToken;
//
//        // Redirection basée sur le statut du mot de passe, en passant le jeton d'accès Auth0
//        if (user.getPassword() == null || user.getPassword().isBlank()) {
//            response.sendRedirect("http://localhost:4200/set-password?email=" + user.getEmail() + "&token=" + finalTokenToPass);
//        } else {
//            response.sendRedirect("http://localhost:4200/login/success?token=" + finalTokenToPass);
//        }
//    }
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
////package com.alhas.hybrid_api.users.user.authRessource;
////
////import com.alhas.hybrid_api.users.user.User;
////import com.alhas.hybrid_api.users.user.UserRepository;
////import io.jsonwebtoken.io.IOException;
////import jakarta.servlet.ServletException;
////import jakarta.servlet.http.HttpServletRequest;
////import jakarta.servlet.http.HttpServletResponse;
////import lombok.RequiredArgsConstructor;
////import org.springframework.security.core.Authentication;
////import org.springframework.security.core.token.TokenService;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.security.oauth2.core.user.OAuth2User;
////import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
////import org.springframework.stereotype.Component;
////import org.springframework.context.annotation.Lazy;
////
////@Component
////public class CustomOAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {
////
////    private final UserRepository userRepository;
////    private final JwtService jwtService;
////
////    public CustomOAuth2AuthenticationSuccessHandler(UserRepository userRepository, JwtService jwtService) {
////        this.userRepository = userRepository;
////        this.jwtService = jwtService;
////    }
////
////
////    @Override
////    public void onAuthenticationSuccess(HttpServletRequest request,
////                                        HttpServletResponse response,
////                                        Authentication authentication) throws IOException, ServletException, java.io.IOException {
////
////        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
////        String email = oAuth2User.getAttribute("email");
////
////        User user = userRepository.findOneByEmail(email)
////                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur OAuth2 introuvable : " + email));
////
////        // Vérifie si le mot de passe est défini
//////        if (user.getPassword() == null || !user.isPasswordSet()) {
//////            // Redirige le frontend vers un formulaire de définition de mot de passe
//////            response.sendRedirect("http://localhost:4200/set-password?email=" + user.getEmail());
//////            return;
//////        }
//////        response.sendRedirect("http://localhost:4200/set-password?email=" + user.getEmail() + "&token=" + token);
////
////        // Sinon : login normal — on génère un token ou autre logique
////        String token = jwtService.generateToken(user);
////
////        // Tu peux aussi renvoyer le token via un paramètre ou un header
////        //response.sendRedirect("http://localhost:4200/login/success?token=" + token);
////        //String token = jwtService.generateToken(user);
////        if (user.getPassword() == null || user.getPassword().isBlank()) {
////            response.sendRedirect("http://localhost:4200/set-password?email=" + user.getEmail() + "&token=" + token);
////        } else {
////            response.sendRedirect("http://localhost:4200/login/success?token=" + token);
////        }
////
////
////    }
////}
