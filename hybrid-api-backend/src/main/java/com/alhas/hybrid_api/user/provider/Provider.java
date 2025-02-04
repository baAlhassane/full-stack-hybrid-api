package com.alhas.hybrid_api.user.provider;

import com.alhas.hybrid_api.product.Product;
import com.alhas.hybrid_api.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@DiscriminatorValue("PROVIDER")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Provider extends User {

   private  CompanieType companieType;
   private TypeOfProvider typeOfProvider;

   @OneToMany
   private List<Product> products;
   @ManyToMany
   private List<User> jobbers;
   @ManyToMany
   private List<User> users;



}
