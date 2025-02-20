package com.alhas.hybrid_api.user.user;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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

        return userInfo;
    }


    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.logout(); // Déconnecte l'utilisateur
        response.sendRedirect("http://localhost:4200/login"); // Redirige vers Angular
    }
}
