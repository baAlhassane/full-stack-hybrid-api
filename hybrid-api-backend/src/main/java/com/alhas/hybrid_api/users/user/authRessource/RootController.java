package com.alhas.hybrid_api.web.controller; // Choisissez un package approprié

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Indique que c'est un contrôleur REST
public class RootController {

    @GetMapping("/") // Mappe les requêtes GET sur la racine de l'application
    public String welcome() {
        return "Bienvenue sur l'API hybride ! Le backend est opérationnel. " +
               "Accédez aux endpoints d'authentification via /api/hybrid-api/auth/login ou /api/hybrid-api/auth/register.";
    }
}