package com.alhas.hybrid_api.users.user.mapper;

import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.User;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserMapper {

    public ReadUserDTO mapUserToReadUserDTO(User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            user.setAuthenticated(authentication.isAuthenticated());
        }
        return  ReadUserDTO.builder()
              .firstname(user.getFirstname())
              .lastname(user.getLastname())
              .email(user.getEmail())
              .imageUrl(user.getImageUrl())
              .isAuthenticated(user.isAuthenticated())
//              .authorities(user.getAuthorities().)
              .build();
    }

    public User mapToReadUserDTOToUser(ReadUserDTO readUserDTO) {
    User user = new User();
    user.setFirstname(readUserDTO.firstname());
    user.setLastname(readUserDTO.lastname());
    user.setEmail(readUserDTO.email());
    user.setImageUrl(readUserDTO.imageUrl());
        return user  ;
    }


}
