package com.alhas.hybrid_api.users.provider;

import com.alhas.hybrid_api.job.JobDTO;
import com.alhas.hybrid_api.job.JobRepository;
import com.alhas.hybrid_api.job.JobService;
import org.springframework.http.ResponseEntity;

public class ProviderService {
    private final JobRepository jobRepository ;
    private final JobService jobService;


    public ProviderService(JobRepository job, JobService jobService) {
        jobRepository = job;
        this.jobService = jobService;
    }

    public ResponseEntity<JobDTO> creteJob(JobDTO jobDTO){


        return ResponseEntity.ok(null);
    }



}
