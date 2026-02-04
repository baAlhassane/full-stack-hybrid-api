package com.alhas.hybrid_api.job;

import org.springframework.stereotype.Service;

@Service
public class JobMapper {

    public Job convertJobDtoToJob(JobDTO jobDTO) {
        Job job = new Job();
        job.setDate(jobDTO.getDate());
        job.setHeureDebut(jobDTO.getHeureDebut());
        job.setHeureFin(jobDTO.getHeureFin());
        job.setTarifPerHours(jobDTO.getTarifPerHours());
        job.setTotalPrice(jobDTO.getTotalPrice());
        job.setDescription(jobDTO.getDescription());
        job.setTypeOfJob(jobDTO.getTypeOfJob());
        job.setTitle(jobDTO.getTitle());
        job.setAddress(jobDTO.getAddress());
        job.setStatus(jobDTO.getStatus());


        return job;
    }


    public JobDTO convertJobToJobDTO(Job job) {
        JobDTO jobDTO = new JobDTO();
        jobDTO.setDate(job.getDate());
        jobDTO.setHeureDebut(job.getHeureDebut());
        jobDTO.setHeureFin(job.getHeureFin());
        jobDTO.setTarifPerHours(job.getTarifPerHours());
        jobDTO.setTotalPrice(job.getTotalPrice());
        jobDTO.setDescription(job.getDescription());
        jobDTO.setTypeOfJob(job.getTypeOfJob());
        jobDTO.setTitle(job.getTitle());
        jobDTO.setAddress(job.getAddress());
        jobDTO.setStatus(job.getStatus());
        jobDTO.setCreatedDate(job.getCreatedDate());
        if (job.getJobPublicId() != null) {
            // Ici, on est sûr que ce n'est pas null, donc .toString() est sécurisé ✅
            jobDTO.setJobPublicId(job.getJobPublicId().toString());
            System.out.println("ID converti avec succès : " + jobDTO.getJobPublicId());
        } else {
            System.out.println("Attention : jobPublicId est NULL dans l'entité Job");
        }
        return jobDTO;

    }
}