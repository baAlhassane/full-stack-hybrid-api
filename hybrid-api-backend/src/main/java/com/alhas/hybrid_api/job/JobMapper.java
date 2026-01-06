package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.picture.JobPicture;
import com.alhas.hybrid_api.picture.JobPictureDTO;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

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



        return job;
    }



    public JobDTO convertJobToJobDTO(Job job ){
        JobDTO jobDTO=new JobDTO();
        jobDTO.setDate(job.getDate());
        jobDTO.setHeureDebut(job.getHeureDebut());
        jobDTO.setHeureFin(job.getHeureFin());
        jobDTO.setTarifPerHours(job.getTarifPerHours());
        jobDTO.setTotalPrice(job.getTotalPrice());
        jobDTO.setDescription(job.getDescription());
        jobDTO.setTypeOfJob(job.getTypeOfJob());
        return jobDTO;
    }



}
