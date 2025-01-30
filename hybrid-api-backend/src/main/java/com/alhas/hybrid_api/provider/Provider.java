package com.alhas.hybrid_api.provider;

import com.alhas.hybrid_api.article.Product;
import com.alhas.hybrid_api.user.User;

import java.util.List;

public class Provider extends User {

    String companieName;
    CompanieType companieType;
    TypeOfProvider typeOfProvider;
    List<User> clients;
    List<Product> products;

}
