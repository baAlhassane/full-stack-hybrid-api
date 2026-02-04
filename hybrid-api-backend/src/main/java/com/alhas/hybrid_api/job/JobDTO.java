package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.picture.jobPicture.JobPictureDTO;
import com.alhas.hybrid_api.users.Address;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {

    private String title;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @JsonFormat(pattern = "HH:mm") // ou "HH:mm:ss" selon ce qu'Angular envoie
    private LocalTime heureDebut;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime heureFin;

    private int tarifPerHours;
    private int totalPrice;
    private TypeOfJob typeOfJob;
    private Set<JobPictureDTO> jobPictures;
    private String jobPublicId; // Doit être String ici
    @Enumerated(EnumType.STRING)
    private JOB_STATUS status;
    private Address address;

    private Instant createdDate;


}
