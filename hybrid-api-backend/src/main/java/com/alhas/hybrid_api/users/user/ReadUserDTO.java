package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import lombok.Builder;

import java.util.Set;

@Builder
public record ReadUserDTO(
         String firstname,
         String lastname,
         String email,
         UserPicture userPicture,
         boolean isAuthenticated,
         String userType,
         boolean passwordSet,
         Set<String> authorities

) {}
