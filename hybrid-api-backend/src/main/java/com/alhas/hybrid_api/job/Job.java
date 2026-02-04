package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.picture.jobPicture.JobPicture;
import com.alhas.hybrid_api.users.Address;
import com.alhas.hybrid_api.users.jobber.Jobber;
import com.alhas.hybrid_api.users.provider.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_seq_for_hib")
    @SequenceGenerator(name="job_seq_for_hib",sequenceName = "job_seq_for_pg", allocationSize = 1)
    @Column(name = "job_id")
    private Long id;

    @UuidGenerator
    @Column(name = "job_public_id", nullable = false)
    private UUID jobPublicId;
    private LocalDate date;
    @Column(name = "heure_debut")// Date de la mission
    private LocalTime heureDebut; // Heure de début
    @Column(name = "heure_fin")
    private LocalTime heureFin; ;
    @Column(name = "tarif_per_hours")
    private int tarifPerHours;
    @Column(name = "total_price")
    private int totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_Job")
    private TypeOfJob typeOfJob;

    @Enumerated(EnumType.STRING)
    private JOB_STATUS status;

    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    @CreatedDate
    @Column(updatable = false,name = "created_date")
    private Instant createdDate=Instant.now();


   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(name = "job_jobber_join",
   joinColumns = {@JoinColumn(name = "job_id")},
           inverseJoinColumns = {@JoinColumn(name="jobber_id")
           }
   )
   private Set<Jobber> jobbers = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn( name ="provider_id", nullable = false )
   private Provider provider;

    @OneToMany(mappedBy = "jobListing", cascade = CascadeType.REMOVE)
    private Set<JobPicture> jobPictures=new HashSet<>();
    private Address address;

}
