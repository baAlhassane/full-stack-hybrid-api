package com.alhas.hybrid_api.users.user.mapper;


import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import com.alhas.hybrid_api.picture.userPicture.UserPictureDTO;
import com.alhas.hybrid_api.users.user.User;
import com.alhas.hybrid_api.users.user.UserDTO;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public UserDTO mapUserToUserDTO(User user) {
        if (user == null) return null;

        UserDTO userDTO = new UserDTO();
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserType(user.getUserType());

        // Mapping de l'avatar avec les données binaires
        userDTO.setUserPicture(mapUserPictureToDTO(user.getAvatar(), user.getId()));

        return userDTO;
    }

    public UserPicture mapDTOToUserPicture(UserPictureDTO dto) {
        if (dto == null) return null;
        UserPicture avatar = new UserPicture();
        avatar.setName(dto.getName());
        avatar.setFileContentType(dto.getFileContentType());
        avatar.setFile(dto.getFile()); // Transfert du binaire DTO -> Entité
        return avatar;
    }

    public UserPictureDTO mapUserPictureToDTO(UserPicture avatar, Long userId) {
        if (avatar == null) return null;

        UserPictureDTO dto = new UserPictureDTO();
        dto.setName(avatar.getName());
        dto.setFileContentType(avatar.getFileContentType());

        // --- CRUCIAL : Transfert des données binaires ---
        // C'est cette ligne qui manquait pour que Angular reçoive l'image
        dto.setFile(avatar.getFile());

        // URL de secours pour l'accès direct
        String avatarUrl = "http://localhost:8081/api/avatar/me";
        dto.setUrl(avatarUrl);
        dto.setUrlDisplay(avatarUrl);

        return dto;
    }
}