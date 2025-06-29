package com.alhas.hybrid_api.users.user.authRessource;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SetPasswordRequest {
    private String email;
    private String password;

    // Getters and setters
}
