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
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/hybrid-api/auth/login").permitAll()
                        .requestMatchers("/api/hybrid-api/auth/register").permitAll()
                        .requestMatchers("/error").permitAll() // Permettre l'accès aux pages d'erreur
                        .requestMatchers("/api/**").hasRole("LANDLORD") // reste du back sécurisé

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