package com.alhas.hybrid_api.users;


import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class Address {

    private String country;
    private String city;
    private String street;
    private String houseNumber;
    private Double latitude;
    private Double longitude;

//    private long address;
//    private String street;
//    private String city;
//    private String state = "France";
//    private int zipCode;
//    private int streetNumber;

}
