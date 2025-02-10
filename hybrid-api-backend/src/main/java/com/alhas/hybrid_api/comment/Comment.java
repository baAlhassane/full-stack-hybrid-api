package com.alhas.hybrid_api.comment;

import com.alhas.hybrid_api.product.ProductPicture;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
  @Id
  @GeneratedValue
    private Long id;
    private  String JobName;
    private String comment;
    private  int notes;
  @UuidGenerator
  @Column(name = "comment_public_id", nullable = false)
  private UUID commentPublicId;
  @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
  Set<ProductPicture> productPictures= new HashSet<>();

 }
