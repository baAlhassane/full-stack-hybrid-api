package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.picture.userPicture.UserPicture;
import com.alhas.hybrid_api.users.Address;
import com.alhas.hybrid_api.users.user.authRessource.Authority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.Instant;
import java.util.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("USER")
@Table(name="hybrid_api_user")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "password")
@Builder
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hybrid_api_user_seq_for_hib")
    @SequenceGenerator(name = "hybrid_api_user_seq_for_hib", sequenceName = "hybrid_api_user_seq_for_pg", allocationSize = 1)
    private Long id;
    @UuidGenerator
    @Column(name = "public_id", nullable = false)
    private UUID publicId;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
//    private String imageUrl;
@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
@JoinColumn(name = "avatar_picture_id")
private UserPicture avatar;
    @JsonIgnore
    private String password;
    @Column(name = "user_type", insertable = false, updatable = false)
    private String userType;
    //@OneToMany
    //private Set<Notification> notifications;
    private boolean isJobber;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "street", column = @Column(name = "addr_street")),
            @AttributeOverride(name = "city", column = @Column(name = "addr_city")),
            @AttributeOverride(name = "country", column = @Column(name = "addr_country")),
            @AttributeOverride(name = "latitude", column = @Column(name = "addr_latitude")),
            @AttributeOverride(name = "longitude", column = @Column(name = "addr_longitude"))
    })
    private Address address;
    private String phoneNumber;

    @CreatedDate
    @Column(updatable = false,name = "created_date")
    private Instant createdDate=Instant.now();


    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Instant lastModifiedDate = Instant.now();


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_authority",
            joinColumns= {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")}
    )
    private Set<Authority> authorities=new HashSet<>();

    @Column(name="password_set" ,nullable = false)
    private boolean passwordSet = false;



}
