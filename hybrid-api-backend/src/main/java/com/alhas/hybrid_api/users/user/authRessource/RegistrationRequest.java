package com.alhas.hybrid_api.users.user.authRessource;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@Validated
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RegistrationRequest {
    @NotEmpty(message = " fisrname is mandatory")
    @NotBlank(message = " fisrname is mandatory")
    private String firstname;
    @NotEmpty(message = " lastname not null")
    @NotBlank(message = "lastname not null")
    private String lastname;
    @NotEmpty(message = " email  is mandatory")
    @NotBlank(message = "email is mandatory")
    @Email(message = "email is not well formated ")
    private String email;
    @NotEmpty(message = " password  is mandatory")
    @NotBlank(message = "lastname  is mandatory")
    @Size(min=8, message = "password size should be 8 caracter minimum")
    private String password;
    @NotEmpty(message = " Role is mandatory")
    @NotBlank(message = "Role is mandatory")
    private String role;
}
