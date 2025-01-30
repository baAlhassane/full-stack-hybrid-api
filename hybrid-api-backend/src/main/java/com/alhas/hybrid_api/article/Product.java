package com.alhas.hybrid_api.article;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public class Product  {
    private ProductType productType;
    String  productName;
    String  productDescription;
    int    productPrice;
    Set<ProductPicture> productPictures;
    private UUID poviderPublicId;

}
