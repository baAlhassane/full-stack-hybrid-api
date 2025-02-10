package com.alhas.hybrid_api.user.provider;

import com.alhas.hybrid_api.job.Job;
import com.alhas.hybrid_api.product.Product;
import com.alhas.hybrid_api.user.User;



import com.alhas.hybrid_api.user.jobber.Jobber;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

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
   private Set<Jobber> jobbers;


   @ManyToMany
   @JoinTable( name = "provider_user_join",
   joinColumns = {@JoinColumn( name = "provider_id")},
           inverseJoinColumns = {@JoinColumn(name ="user_id")}
   )
   private Set<User> users;

   @OneToMany(mappedBy = "provider")
   private Set<Job> jobs;



}
