package com.alhas.hybrid_api.infrastructure.config;
import com.alhas.hybrid_api.users.user.UserRepository;
import com.alhas.hybrid_api.users.user.authRessource.CustomUserDetailsService;
import com.alhas.hybrid_api.users.user.authRessource.JwtAuthenticationFilter;
import com.alhas.hybrid_api.users.user.authRessource.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// AJOUTEZ CES TROIS LIGNES :
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays; // Ajout également pour Arrays.asList
@Configuration
public class SecurityConfig {


    private final UserRepository userRepository;
    private final CustomUserDetailsService userDetailsService;
    public SecurityConfig(UserRepository userRepository, CustomUserDetailsService userDetailsService) {


        this.userRepository = userRepository;
        this.userDetailsService = userDetailsService;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {


        http
                .csrf(csrf -> csrf.disable()) // Désactive la protection CSRF
                 .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Utilisez la source de configuration CORS que nous allons définir
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/hybrid-api/auth/login").permitAll()
                        .requestMatchers("/api/hybrid-api/auth/register").permitAll()
                        .requestMatchers("/error").permitAll() // Permettre l'accès aux pages d'erreur
                        .requestMatchers("/").permitAll()
                // Si vous avez un endpoint public de connexion/inscription
                .requestMatchers("/api/hybrid-api/auth/**").permitAll() // Autorise l'accès à tout ce qui est sous /api/hybrid-api/auth/
                       .requestMatchers("/api/**").hasRole("LANDLORD") // reste du back sécurisé
                         .requestMatchers("/actuator/health").permitAll() // Autorise l'accès à /actuator/health

                        .anyRequest()
                        .authenticated() // Toute autre requête nécessite une authentification
                )
                // Gestion de la session
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .formLogin(AbstractHttpConfigurer::disable)
                .authenticationProvider(authenticationProvider(userDetailsService, passwordEncoder()))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                //SecurityConfig.java
                .logout(logout -> logout
                // Note: request.logout() est souvent utilisé avec des sessions Spring Security
                    // et peut ne pas être nécessaire ou suffisant pour un logout JWT stateless.
                    // Pour un JWT, la déconnexion se gère principalement côté client
                    // en supprimant le token et potentiellement en invalidant le token côté serveur si vous avez une liste noire.
                    // request.getSession().invalidate(); est pertinent si vous gérez des sessions,
                    // mais vous avez `SessionCreationPolicy.STATELESS`.
                    // Gardez juste response.setStatus(HttpServletResponse.SC_OK); pour confirmer la déconnexion réussie.
                        .logoutUrl("/api/hybrid-api/auth/logout-hybrid-api")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            // request.logout();// Invalide la session
                            // request.getSession().invalidate();
                            response.setStatus(HttpServletResponse.SC_OK); // Répond 200 (OK)
                            //response.sendRedirect(logoutUrl); // Redirige vers Auth0 logout
                        })
                );

        return http.build();
    }

 @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200")); // Autorise l'origine de votre frontend Angular
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Méthodes HTTP autorisées
        configuration.setAllowedHeaders(Arrays.asList("*")); // Autorise tous les en-têtes (y compris Content-Type, Authorization, etc.)
        configuration.setAllowCredentials(true); // Très important pour les requêtes avec cookies/tokens (comme votre cas avec `withCredentials: true`)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Applique cette config CORS à toutes les routes de votre backend
        return source;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return authProvider;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(jwtService, userDetailsService);
    }






}