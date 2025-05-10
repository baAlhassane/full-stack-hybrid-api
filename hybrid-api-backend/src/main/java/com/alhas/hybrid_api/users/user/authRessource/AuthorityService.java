package com.alhas.hybrid_api.users.user.authRessource;

import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthorityService {
    private final AuthorityRepository authorityRepository;

    public AuthorityService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }


    public void saveAuthority( Set<Authority > authorities) {
        authorities.stream().forEach(authority -> {
            authorityRepository.save(authority);
        });
    }
}


