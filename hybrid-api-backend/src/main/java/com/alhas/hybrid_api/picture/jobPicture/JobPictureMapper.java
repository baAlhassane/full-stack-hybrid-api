package com.alhas.hybrid_api.picture.jobPicture;

import org.springframework.stereotype.Service;

@Service
public class JobPictureMapper {

    JobPicture convertJobPictureDTOToJobPicture(JobPictureDTO pictureDTO){

        JobPicture  jobPicture=new JobPicture();
        jobPicture.setFile(pictureDTO.getFile());
        jobPicture.setFileContentType(jobPicture.getFileContentType());
        jobPicture.setName(jobPicture.getName());

        return jobPicture;
    }
}
