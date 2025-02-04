package com.alhas.hybrid_api.job;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Job {
    @Id
    @GeneratedValue
    private LocalDate date;        // Date de la mission
    private LocalTime heureDebut; // Heure de début
    private LocalTime heureFin; ;
    private int tarifPerHours;
    private int totaPrice;


}
