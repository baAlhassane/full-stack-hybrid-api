package com.alhas.hybrid_api.users.user.authRessource;

public record LoginRequest(
        String firstname,
        String lastname,
        String email,
        String password
) { }
