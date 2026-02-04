package com.alhas.hybrid_api.picture;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass // Indique que les champs sont hérités par les sous-entités
public abstract class AbstractPicture {

    @Lob
    @Column(name = "file", nullable = false)
    private byte[] file;

    @Column(name = "file_content_type")
    private String fileContentType;

    @Column(name = "name")
    private String name;

//    public AbstractPicture(byte[] data, String contentType, String name) {
//    }
}