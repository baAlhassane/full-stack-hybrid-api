package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.user.jobber.Jobber;
import com.alhas.hybrid_api.user.provider.Provider;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
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
    @Column(name = "code", nullable = false)
    private UUID jobPublicId;

    private LocalDate date;        // Date de la mission
    private LocalTime heureDebut; // Heure de début
    private LocalTime heureFin; ;
    private int tarifPerHours;
    private int totaPrice;
    private String description;

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



}
