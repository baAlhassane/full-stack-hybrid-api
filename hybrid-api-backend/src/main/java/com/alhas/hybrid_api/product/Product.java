package com.alhas.hybrid_api.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq_for_hib")
    @SequenceGenerator(name = "product_seq_for_hib", sequenceName = "product_seq_for_pg")
    private Long id;
    private ProductType type;
    String name;
    String description;
    BigDecimal price;
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    @Column(name = "product_pictures")
    Set<ProductPicture> productPictures=new HashSet<>();
    @Column(name="provider_public_id" ,nullable = false)
    private UUID poviderPublicId;




}
