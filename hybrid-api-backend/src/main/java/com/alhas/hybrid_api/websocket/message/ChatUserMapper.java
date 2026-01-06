package com.alhas.hybrid_api.websocket.message;

import com.alhas.hybrid_api.users.user.User;
import com.alhas.hybrid_api.users.user.authRessource.Authority;

import java.util.stream.Collectors;

public class ChatUserMapper {

    public static ChatUserDTO toDTO(User user) {
        if (user == null) return null;

        return ChatUserDTO.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .uerfullname(user.getFirstname() + " " + user.getLastname())
                .email(user.getEmail())
                .imageUrl(user.getImageUrl())
                .isAuthenticated(true) // ou selon ta logique
                .userRole(user.getUserType())
                .type(user.getUserType())
                .authorities(user.getAuthorities()
                        .stream().map(Authority::getName).collect(Collectors.toSet()))
                .notification(null) // TODO: à mapper si tu as un champ lié
                .build();
    }
}
