package com.alhas.hybrid_api.infrastructure.config;
import com.alhas.hybrid_api.users.user.Authority;
import com.alhas.hybrid_api.users.user.User;
import com.nimbusds.oauth2.sdk.auth.JWTAuthentication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SecurityUtils {


    public static final String ROLE_TENANT = "ROLE_TENANT";
    public static final String ROLE_LANDLORD = "ROLE_LANDLORD";
    public static final String CLAIMS_NAMESPACE = "https://alhas.com/roles";


public static User mapOauth2AttributesToUser(Map<String, Object> attributes){
      User user = new User();

    if(attributes.get("given_name")!=null){
        user.setFirstname((String) attributes.get("given_name"));
    }

    if(attributes.get("family_name")!=null){
        user.setLastname((String) attributes.get("family_name"));
    }

    if(attributes.get("email") !=null){
        user.setEmail((String) attributes.get("email"));
    }

    if(attributes.get("picture")!=null ){
        user.setImageUrl((String) attributes.get("picture"));
    }

    if(attributes.get("Authenticated")!=null){
        user.setAuthenticated((boolean) attributes.get("Authenticated"));
    }


    if(attributes.get(CLAIMS_NAMESPACE)!=null){

        List<String> authorities = (List<String>) attributes.get(CLAIMS_NAMESPACE);

        Set<Authority> authoritiesSet = authorities
                .stream()
                .map(authority ->{
                            Authority role =new Authority();
                            role.setName(authority);
                            return role;
                        }).collect(Collectors.toSet());


       user.setAuthorities(authoritiesSet);

    }

    return user;

}


    public static Collection<String> getRolesFromClaims(Map<String, Object> claims){
    return (List<String>) claims.get(CLAIMS_NAMESPACE);
    }


    public static List<SimpleGrantedAuthority> extractAuthorityFromClaims(Map<String, Object> claims){

    List<String> authorities = (List<String>) getRolesFromClaims(claims);
    return authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList())  ;
    }

    private static Stream<String> getAuthorities(Authentication authentication){

        Collection<? extends GrantedAuthority> authorities= authentication instanceof JwtAuthenticationToken jwtAuthentication
                ? extractAuthorityFromClaims(jwtAuthentication.getToken().getClaims()) :
                authentication.getAuthorities();

           return  authorities.stream().map(GrantedAuthority::getAuthority);
    }

    public static boolean hasCurrentUserAuthorites(String ...authorities) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (authentication !=null && getAuthorities(authentication)
                .anyMatch(authority-> Arrays.asList(authorities).contains(authority)));
    }

    public static Instant getUpdatedAtIDP(Map<String, Object> claims) {
    //if(claims.get("updated_at")!=null){}
     //return (Instant) claims.get("updated_at");
        Object updatedAt = claims.get("updated_at");

        if (updatedAt instanceof String) {
            try {
                return Instant.parse((String) updatedAt);
            } catch (DateTimeParseException e) {
                // Log erreur si nécessaire
                return Instant.EPOCH; // Valeur par défaut pour éviter une exception
            }
        }
        return Instant.EPOCH; // Valeur par défaut si `updated_at` est absent ou mal formé
    }

/*/
**
User Attributes: {
    sub=google-oauth2|111350909395437156056,
    email_verified=true,
    https://alhas.com/roles=[ROLE_LANDLORD],
    iss=https://dev-lbu4c820m2nza8vh.us.auth0.com/,
    given_name=Alhassane,
    nickname=alhassanebai36,
    name=Alhassane BA,
    family_name=BA,
    email=alhassanebai36@gmail.com
}
 */




}
