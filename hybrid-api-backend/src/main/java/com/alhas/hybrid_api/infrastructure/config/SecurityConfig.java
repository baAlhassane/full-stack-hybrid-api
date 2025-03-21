package com.alhas.hybrid_api.infrastructure.config;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Désactive la protection CSRF
                .authorizeHttpRequests(auth -> auth
                        // Autoriser OPTIONS
                                .requestMatchers("/api/hybrid-api/auth/get-authenticated-user").authenticated()
                                .requestMatchers("/api/**").permitAll()

//                        .requestMatchers("/api/user/logout").authenticated() // Logout accessible aux utilisateurs connectés
                        .anyRequest()
                        .authenticated() // Toute autre requête nécessite une authentification
                )
                .oauth2Login(oauth2 -> oauth2
                      // .loginPage("/oauth2/authorization/auth0") // Redirige vers Auth0 pour le login
                        .defaultSuccessUrl("http://localhost:4200/signin", true) // Après login, aller sur Angular
                )
                //SecurityConfig.java
                .logout(logout -> logout
                        .logoutUrl("/api/hybrid-api/auth/logout-hybrid-api")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            String issuerUri = "https://dev-lbu4c820m2nza8vh.us.auth0.com/";
                            String clientId = "VWfz84xd6cDGD3u6g7loNHb4ykuCnu9a"; // Remplace par ton CLIENT_ID
                            String returnTo = "http://localhost:4200/signin"; // URL de redirection après logout
                            String logoutUrl = issuerUri + "v2/logout?client_id=" + clientId + "&returnTo=" + returnTo;
                            SecurityContextHolder.clearContext();
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


