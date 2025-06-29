package com.alhas.hybrid_api.users.user.mapper;


import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.User;
import org.springframework.stereotype.Service;


@Service
public class UserMapper {



    public User mapToReadUserDTOToUser(ReadUserDTO readUserDTO) {
    User user = new User();
    user.setFirstname(readUserDTO.firstname());
    user.setLastname(readUserDTO.lastname());
    user.setEmail(readUserDTO.email());
    user.setImageUrl(readUserDTO.imageUrl());
        return user  ;
    }


}
