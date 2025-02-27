package com.alhas.hybrid_api.users.user;

import lombok.Builder;

@Builder
public record ReadUserDTO(
         String firstname,
         String lastname,
         String email,
         String imageUrl
) {}
