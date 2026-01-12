package com.alhas.hybrid_api.picture;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPictureDTO {
    private byte [] file;    // String fileBase64;
    private String fileContentType;
    private String name;

    //private boolean isCover;

}
