package com.alhas.hybrid_api.users.user.authRessource;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String firstname;
    private String lastname;
    private String token;
    private String type = "Bearer";
    private String uerfullname;
    private String email;
    private String userRole;
    private boolean isAuthenticated;
    private String imageUrl;
    public LoginResponse(String token, String username, String email) {
        this.token = token;
        this.uerfullname= username;
        this.email = email;
    }

}
