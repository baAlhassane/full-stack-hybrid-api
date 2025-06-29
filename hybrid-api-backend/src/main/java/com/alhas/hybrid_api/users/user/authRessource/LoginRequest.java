package com.alhas.hybrid_api.users.user.authRessource;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    //private String firstname;
   private  String email;
    private String password;

}
//public record LoginRequest(
//        String firstname,
//        String lastname,
//        String email,
//        String password
//) { }
