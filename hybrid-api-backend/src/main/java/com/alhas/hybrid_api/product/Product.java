package com.alhas.hybrid_api.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private ProductType productType;
    String productName;
    String productDescription;
    int productPrice;
    @OneToMany
    Set<ProductPicture> productPictures;
    private UUID poviderPublicId;

}
