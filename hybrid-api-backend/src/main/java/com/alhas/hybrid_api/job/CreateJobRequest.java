package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.picture.jobPicture.JobPictureDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateJobRequest {

    private LocalDate date;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private int tarifPerHours;
    private int totalPrice;
    private String description;
    private TypeOfJob typeOfJob;

    private Set<JobPictureDTO> pictures; // <=== AJOUT IMPORTANT
}
