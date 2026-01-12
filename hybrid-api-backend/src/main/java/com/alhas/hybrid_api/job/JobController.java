package com.alhas.hybrid_api.job;


import com.alhas.hybrid_api.picture.JobPictureDTO;
import com.alhas.hybrid_api.picture.JobPictureMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hybrid-api/job")
@Slf4j
public class JobController {

    private static Logger logger= LoggerFactory.getLogger(JobController.class);
    private final JobService jobService ;
    private final ObjectMapper objectMapper;
    private final JobMapper jobMapper;
   private final JobRepository jobRepository;
   private final JobPictureMapper jobPictureMapper;
    public JobController(JobService jobService, ObjectMapper  objectMapper, JobMapper jobMapper, JobRepository jobRepository, JobPictureMapper jobPictureMapper) {
        this.jobService = jobService;
        this.objectMapper = objectMapper;
        this.jobMapper = jobMapper;
        this.jobRepository = jobRepository;
        this.jobPictureMapper = jobPictureMapper;
    }


    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createJob(
            @RequestPart("jobDTO") String jobJson, // Reçoit le JSON brut sans le parser
            @RequestPart("images") List<MultipartFile> images
    ) throws IOException {
        logger.info("BRAVO ! Le contrôleur est atteint !");
        logger.info("JSON reçu : " + jobJson);
       List<JobPictureDTO> pictureDtos=new ArrayList<>();
        logger.info("--- Vérification des fichiers ---");
        logger.info("Nombre de fichiers reçus : " + images.size());
        int i=0;
        for (var p : images) {
            logger.info("Fichier : " + p.getName() +
                    " | Taille : " +  p.getSize() +
                    " | Type : " + p.getContentType());
            JobPictureDTO pic= new JobPictureDTO(p.getBytes(),p.getContentType(),p.getName()+"-"+i);

            pictureDtos.add(pic);

            i++;
        }
        // Désérialiser le DTO


          JobDTO saveJobDto = objectMapper.readValue(jobJson, JobDTO.class);
//        Job jobTosave=jobMapper.convertJobDtoToJob(saveJobDto);
//        Job save = jobRepository.save(jobTosave);
        //jobService.createJob()


       return ResponseEntity.ok(jobService.createJob(saveJobDto, pictureDtos));
    }


    @GetMapping("/jobs")
     List<JobDTO> getAll(){

        List<JobDTO> allJob=new ArrayList<>();
        //allJob= jobRepository.findAll().stream().map( job-> jobMapper.convertJobToJobDTO(job)).toList();
        return jobRepository.findAll().stream().map( job-> jobMapper.convertJobToJobDTO(job)).toList();
     }


    @GetMapping("jobs/{jobPublicId}")
    ResponseEntity<JobDTO>  getJobByPublicId(@PathVariable UUID jobPublicId){
        JobDTO oneByPublicId = jobService.getOneByPublicId(jobPublicId);

        //allJob= jobRepository.findAll().stream().map( job-> jobMapper.convertJobToJobDTO(job)).toList();
        return ResponseEntity.ok(oneByPublicId);
    }


}
