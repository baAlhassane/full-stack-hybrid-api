package com.alhas.hybrid_api.picture.userPicture;

import com.alhas.hybrid_api.picture.AbstractPicture;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class UserPicture extends AbstractPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userPictureSeq")
    @SequenceGenerator(name = "userPictureSeq", sequenceName = "user_picture_generator", allocationSize = 1)
    private Long id;
    private String ulr;

}