package com.alhas.hybrid_api.product;

import com.alhas.hybrid_api.comment.Comment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_pictures_seq")
    @SequenceGenerator(name = "product_picture_seq", sequenceName = "sequence_picture_for_pg")
    @Column(name = "picture_id")
    private long id;
    private byte [] file;
    private String fileContentype;
    private boolean isCover;
    @ManyToOne
    @JoinColumn(name = "picture_product" )
    private Product product;

    @ManyToOne
    @JoinColumn(name = "picture_comment")
    private Comment comment;


}
