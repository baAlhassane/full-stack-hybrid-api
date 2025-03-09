package com.alhas.hybrid_api.users.user;

import com.alhas.hybrid_api.notification.Notification;
import com.alhas.hybrid_api.users.Address;
import com.alhas.hybrid_api.users.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "user_type", discriminatorType = DiscriminatorType.STRING)
@Table(name="hybrid_api_user")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private boolean isAuthenticated=false;
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


}
