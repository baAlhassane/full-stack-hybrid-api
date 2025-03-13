package com.alhas.hybrid_api.users.user;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OidcUser principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur non authentifié");
        }

        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("name", principal.getFullName());
        userInfo.put("email", principal.getEmail());
        userInfo.put("picture", principal.getPicture());
       String claim=   "https://alhas.com/roles";
        //userInfo.put("authorities", principal.getAuthorities());

        System.out.println( " OidcUser principal = "+  principal );

        // Récupérer un claim spécifique
        Map<String, Object> map = principal.getAttributes() ; // Exemple
        System.out.println( " principal.getAttributes() = "+  map );
        System.out.println( " principal.getAttributes() = "+  map.get(claim) );

        userInfo.put("claim",map.get(claim));
        String [] test={"test1"} ; //{"test1","test2"};
        userInfo.put("tests",test);


        return userInfo;
    }


    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        SecurityContextHolder.clearContext(); // Efface l'authentification Spring Security
        request.logout(); // Déconnecte l'utilisateur
        request.getSession().invalidate(); // Invalide la session
        response.sendRedirect("http://localhost:4200/signin"); // Redirige vers Angular
    }
}
