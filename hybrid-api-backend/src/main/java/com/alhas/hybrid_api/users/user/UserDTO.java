package com.alhas.hybrid_api.users.user;



import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import com.alhas.hybrid_api.picture.userPicture.UserPictureDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String firstname;
    private String lastname;
    private String token;
    private String type = "Bearer";
    private String uerfullname;
    private String email;
    private String userType;
    private boolean isAuthenticated ;
    private String url;
    private UserPictureDTO userPicture;


}
