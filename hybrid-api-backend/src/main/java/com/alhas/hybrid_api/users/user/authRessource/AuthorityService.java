package com.alhas.hybrid_api.users.user.authRessource;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Set;

@Service
public class AuthorityService {

    private final AuthorityRepository authorityRepository;

    public AuthorityService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    @Transactional
    public void saveAuthority(Collection<? extends GrantedAuthority> authorities) {
        authorities.forEach(grantedAuthority -> {
            Authority authority = convertToAuthority((SimpleGrantedAuthority) grantedAuthority);
            // Save the authority object to the database
        });
    }


    public Authority convertToAuthority(SimpleGrantedAuthority grantedAuthority) {
        return new Authority(grantedAuthority.getAuthority());
    }

}
