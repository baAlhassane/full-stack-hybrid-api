package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.picture.JobPicture;
import com.alhas.hybrid_api.picture.JobPictureDTO;
import com.alhas.hybrid_api.picture.JobPictureRepository;
import com.alhas.hybrid_api.users.provider.Provider;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

@Service
public class JobService {
    private final JobRepository  jobRepository;
    private final JobMapper jobMapper;
    private final JobPictureRepository jobPictureRepository;

    public JobService(JobRepository jobRepository, JobMapper jobMapper, JobPictureRepository jobPictureRepository) {
        this.jobRepository = jobRepository;
        this.jobMapper = jobMapper;
        this.jobPictureRepository = jobPictureRepository;
    }

    @Transactional
    public JobDTO createJob(JobDTO request, Provider provider) {

        // 1. Convertir DTO → entity Job
        Job job = jobMapper.convertJobDtoToJob(request);
        job.setProvider(provider);

        // 2. Enregistrer le Job pour récupérer l'ID
        Job savedJob = jobRepository.save(job);

        // 3. Créer + enregistrer les images
        if (request.getJobPpictures() != null) {

            Set<JobPicture> pictures = new HashSet<>();

            for (JobPictureDTO dto : request.getJobPpictures()) {
                JobPicture pic = new JobPicture();
                pic.setJobListing(savedJob);
                pic.setFile(dto.getFile());
                pic.setFileContentType(dto.getFileContentType());
                pic.setCover(dto.isCover());
                pictures.add(pic);
            }

            jobPictureRepository.saveAll(pictures);
            savedJob.setJobPictures(new HashSet<>(pictures));
        }

        // 4. Convertir entity → DTO
        return jobMapper.convertJobToJobDTO(savedJob);
    }




}
