package com.alhas.hybrid_api.infrastructure.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;

import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.SecurityFilterChain;

import java.util.HashSet;

import java.util.Set;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Désactive la protection CSRF
                .authorizeHttpRequests(auth -> auth
                        // Autoriser OPTIONS
                                .requestMatchers("/api/hybrid-api/auth/get-authenticated-user-auth0").authenticated()
                                .requestMatchers("/api/hybrid-api/auth/get-authenticated-user-login").authenticated()
                                .requestMatchers("/api/**").permitAll()
                        .anyRequest()
                        .authenticated() // Toute autre requête nécessite une authentification
              )
                // Configuration de l'authentification par formulaire
                .oauth2Login(oauth2 -> oauth2
                      // .loginPage("/oauth2/authorization/auth0") // Redirige vers Auth0 pour le login
                        .defaultSuccessUrl("http://localhost:4200/signin", true) // Après login, aller sur Angular
                )

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


public GrantedAuthoritiesMapper grantedAuthoritiesMapper() {
        return authorities -> {
            Set< GrantedAuthority> grantedAuthorities= new HashSet<>();

            authorities.forEach(grantedAuthority ->{
                    if(grantedAuthority instanceof OidcUserAuthority oidcUserAuthority)
                    grantedAuthorities.addAll(SecurityUtils.extractAuthorityFromClaims(oidcUserAuthority.getUserInfo().getClaims()));
            }) ;

            return grantedAuthorities;
        };
}


}


