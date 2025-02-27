package com.alhas.hybrid_api.users.user.mapper;

import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.User;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public ReadUserDTO mapUserToReadUserDTO(User user) {
        //return new ReadUserDTO(user.getFirstname(), user.getLastname(), user.getEmail(), user.getImageUrl());
      return  ReadUserDTO.builder()
              .firstname(user.getFirstname())
              .lastname(user.getLastname())
              .email(user.getEmail())
              .imageUrl(user.getImageUrl())
              .build();
    }

    public User mapToReadUserDTOToUser(ReadUserDTO readUserDTO) {
    User user = new User();
    user.setFirstname(readUserDTO.firstname());
    user.setLastname(readUserDTO.lastname());
    user.setEmail(readUserDTO.email());
    user.setImageUrl(readUserDTO.imageUrl());
        return user  ;
    }


}
