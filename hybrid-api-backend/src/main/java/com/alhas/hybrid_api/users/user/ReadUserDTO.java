package com.alhas.hybrid_api.users.user;

import lombok.Builder;

import java.util.Set;

@Builder
public record ReadUserDTO(
         String firstname,
         String lastname,
         String email,
         String imageUrl,
         Set<String> authorities
) {}
