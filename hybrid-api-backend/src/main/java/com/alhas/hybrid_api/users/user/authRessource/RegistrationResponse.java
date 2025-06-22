package com.alhas.hybrid_api.users.user.authRessource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationResponse {
    private boolean success;
    private String message;
    private String fullName;
}
