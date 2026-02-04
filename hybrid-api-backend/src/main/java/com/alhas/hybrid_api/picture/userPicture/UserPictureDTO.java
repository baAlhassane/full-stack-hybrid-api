package com.alhas.hybrid_api.picture.userPicture;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
public class UserPictureDTO {
    private String name;
    private String fileContentType;
    private String url;
    private String urlDisplay; // Attention à la casse (u minuscule)

    // AJOUTE CE CHAMP ICI
    private byte[] file;
}
