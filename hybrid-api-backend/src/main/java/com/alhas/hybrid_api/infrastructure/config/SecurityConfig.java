package com.alhas.hybrid_api.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Désactive la protection CSRF
                .authorizeHttpRequests(auth -> auth
                        // Autoriser OPTIONS
                        .requestMatchers("/api/**").permitAll()
                        .requestMatchers("/api/user/me").authenticated()
                        .requestMatchers("/api/user/logout").authenticated() // Logout accessible aux utilisateurs connectés
                        .anyRequest().authenticated() // Toute autre requête nécessite une authentification
                )
                .oauth2Login(oauth2 -> oauth2
                       // .loginPage("/oauth2/authorization/auth0") // Redirige vers Auth0 pour le login
                        .defaultSuccessUrl("http://localhost:4200/", true) // Après login, aller sur Angular
                )
                .logout(logout -> logout
                        .logoutUrl("/api/user/logout") // Définir l'URL de déconnexion
                        .logoutSuccessUrl("http://localhost:4200/login") // Redirige vers Angular après logout
                        .deleteCookies("JSESSIONID") // Supprime le cookie de session
                        .invalidateHttpSession(true)
                        .clearAuthentication(true)
                );
        return http.build();
    }




//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // ✅ Autoriser le frontend
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(List.of("*"));
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }




}

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(auth -> auth
//                        .anyRequest().authenticated()
//                )
//                .oauth2Login(Customizer.withDefaults()); // Active la connexion OAuth2 avec Google
//
//        return http.build();
//    }
//}
