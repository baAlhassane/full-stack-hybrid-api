package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.picture.JobPictureDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

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
    private Set<JobPictureDTO> jobPpictures;
    private UUID jobPublicId;
    @Enumerated(EnumType.STRING)
    private JOB_STATUS status;


}
