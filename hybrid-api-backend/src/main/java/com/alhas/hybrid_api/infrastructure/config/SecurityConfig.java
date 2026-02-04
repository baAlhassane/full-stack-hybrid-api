package com.alhas.hybrid_api.infrastructure.config;

import com.alhas.hybrid_api.users.user.UserRepository;
import com.alhas.hybrid_api.users.user.authRessource.CustomUserDetailsService;
import com.alhas.hybrid_api.users.user.authRessource.JwtAuthenticationFilter;
import com.alhas.hybrid_api.users.user.authRessource.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

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
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // <-- Important pour CORS
//                        .requestMatchers("/api/hybrid-api/auth/login").permitAll()
//                        .requestMatchers("/api/hybrid-api/auth/register").permitAll()
//                        .requestMatchers("/actuator/health").permitAll()
//                        .requestMatchers("/api/hybrid-api/auth/logout-hybrid-api").permitAll()
//                        .requestMatchers("/ws/**").permitAll()
//                        .requestMatchers("/topic/**").permitAll()
//                        .requestMatchers("/error").permitAll() // Permettre l'accès aux pages d'erreur
//                        //.requestMatchers("/api/**").hasRole("LANDLORD") // reste du back sécurisé
//                        .requestMatchers("/api/**").permitAll()// plus de vérification de rôle
//                        .anyRequest()
//                        .authenticated() // Toute autre requête nécessite une authentification
//                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/avatar/**").permitAll()
                        // 1. Les routes publiques (Login / Register / Actuator)
                        .requestMatchers("/api/hybrid-api/auth/login", "/api/hybrid-api/auth/register", "/actuator/health").permitAll()
                        // 2. Les routes "Lecture seule" (Optionnel : si tu veux que tout le monde voie les jobs)
                        .requestMatchers(HttpMethod.GET, "api/hybrid-api/job/jobs/**").permitAll()
                                .requestMatchers("/api/hybrid-api/auth/logout-hybrid-api").permitAll()
                        .requestMatchers("/ws/**").permitAll()
                      .requestMatchers("/topic/**").permitAll()  ///api/hybrid-api/job
                        .requestMatchers("/error").permitAll() // Permettre l'accès aux pages d'erreur
                        .requestMatchers("/api/**").hasRole("LANDLORD") // reste du back sécurisé
                        // 3. TOUT LE RESTE des API doit être authentifié
                        .requestMatchers("/api/**").authenticated()

                        .anyRequest().authenticated()
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
                        .logoutUrl("/api/hybrid-api/auth/logout-hybrid-api")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            request.logout();// Invalide la session
                            request.getSession().invalidate();
                            response.setStatus(HttpServletResponse.SC_OK); // Répond 200 (OK)
                            //response.sendRedirect(logoutUrl); // Redirige vers Auth0 logout
                        })
                );

        return http.build();
    }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOriginPatterns(Arrays.asList(
                    "http://localhost:*",           // tous les ports localhost
                    "http://127.0.0.1:*",
                    "http://hybrid-api-front-dev.local",
                    "http://hybrid-api-back-dev.local"));
            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"));
            configuration.setAllowedHeaders(Arrays.asList("*"));
            configuration.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
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