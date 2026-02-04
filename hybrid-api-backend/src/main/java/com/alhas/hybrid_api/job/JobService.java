package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.picture.jobPicture.JobPicture;
import com.alhas.hybrid_api.picture.jobPicture.JobPictureDTO;
import com.alhas.hybrid_api.picture.jobPicture.JobPictureRepository;
import com.alhas.hybrid_api.users.provider.Provider;
import com.alhas.hybrid_api.users.provider.ProviderRepository;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class JobService {
    private final JobRepository  jobRepository;
    private final JobMapper jobMapper;
    private final JobPictureRepository jobPictureRepository;
    private final ProviderRepository providerRepository;

    public JobService(JobRepository jobRepository, JobMapper jobMapper, JobPictureRepository jobPictureRepository, SecurityUtils securityUtils, ProviderRepository providerRepository) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
        this.jobPictureRepository = jobPictureRepository;
        this.providerRepository = providerRepository;
    }

    @Transactional
    public JobDTO createJob(JobDTO request, List<JobPictureDTO> pictureDTOS) {

       Provider provider=new Provider();
        String email= SecurityUtils.getCurrentUserEmail();
        Optional<Provider> optionalProvider= providerRepository.findByEmail(email);
        if(optionalProvider.isPresent()){
            provider=optionalProvider.get();

        }


        // 1. Convertir DTO → entity Job
        Job job = jobMapper.convertJobDtoToJob(request);
        job.setProvider(provider);


        // 2. Enregistrer le Job pour récupérer l'ID
        Job savedJob = jobRepository.saveAndFlush(job);
       // Job savedJob = jobRepository.save(job);


        // 3. Créer + enregistrer les images
        if (pictureDTOS.size()>0) {

            Set<JobPicture> pictures = new HashSet<>();

            for (JobPictureDTO dto : pictureDTOS) {
                JobPicture pic = new JobPicture();
                pic.setJobListing(savedJob);
                pic.setFile(dto.getFile());
                pic.setFileContentType(dto.getFileContentType());
                pictures.add(pic);
            }

            jobPictureRepository.saveAll(pictures);
            savedJob.setJobPictures(new HashSet<>(pictures));
        }

        // 4. Convertir entity → DTO
        return jobMapper.convertJobToJobDTO(savedJob);
    }

    @Transactional(readOnly = true)
  JobDTO getOneByPublicId(UUID jobPublicId ){

      Job job= jobRepository.findOneByJobPublicId(jobPublicId)
              .orElseThrow(()-> new JobNotFoundException(" Job with publicId "+ jobPublicId + "does not exist" ));
        JobDTO  jobByPublicIdDTO= jobMapper.convertJobToJobDTO(job);
        return jobByPublicIdDTO;
  }

}
