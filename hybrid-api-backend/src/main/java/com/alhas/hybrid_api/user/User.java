package com.alhas.hybrid_api.user;

import com.alhas.hybrid_api.notification.Notification;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="hybrid_api_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hybrid_api_user_seq_for_hib")
    @SequenceGenerator(name = "hybrid_api_user_seq_for_hib", sequenceName = "hybrid_api_user_seq_for_pg", allocationSize = 1)
    private Long id;
    @UuidGenerator
    @Column(name = "public_id", nullable = false)
    private UUID publicId;
    private String firstname;
    private String lastname;
    private String email;
    private String imageUrl;
    @OneToMany
    private Set<Notification> notifications;
    private boolean isJobber;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride( name = "street", column = @Column(name = "street")),
            @AttributeOverride( name = "city", column = @Column(name = "city")),
            @AttributeOverride( name = "streetNumber", column = @Column(name = "streetNumber"))
    })
    private Address address;
    private String phoneNumber;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    Set<Role> roles = new HashSet<>();


}
