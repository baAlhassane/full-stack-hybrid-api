package com.alhas.hybrid_api.job;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;

@RestController
@RequestMapping("/api/hybrid-api/job")
@Slf4j
public class JobController {

    private static Logger logger= LoggerFactory.getLogger(JobController.class);
    private final JobService jobService ;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createJob(
            @RequestPart("jobDTO") String jobDTOJson, // Reçois en String d'abord !
            @RequestPart("pictures") MultipartFile[] pictures
    ) throws JsonProcessingException {


        logger.info("JSON brut reçu du front : " + jobDTOJson);

        logger.info("--- Vérification des fichiers ---");
        if (pictures != null) {
            logger.info("Nombre de fichiers reçus : " + pictures.length);
            for (MultipartFile file : pictures) {
                logger.info("Nom : " + file.getOriginalFilename() +
                        " | Taille : " + file.getSize() + " octets" +
                        " | Type : " + file.getContentType());
            }
        } else {
            logger.warn("Aucun fichier reçu !");
        }

        ObjectMapper mapper = new ObjectMapper();
        // Configuration pour gérer tes LocalDate/LocalTime si nécessaire
        mapper.findAndRegisterModules();

        JobDTO jobDTO = mapper.readValue(jobDTOJson, JobDTO.class);


        return ResponseEntity.ok(jobDTO);
    }

//    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<JobDTO> createJob(
//            MultipartHttpServletRequest request,
//            @RequestPart(name = "jobDTO") JobDTO jobDTO // Spring peut convertir le JSON String en Objet automatiquement
//    ) {
//        // Pour récupérer les fichiers depuis la requête :
//        List<MultipartFile> files = request.getFiles("pictures");
//
//        logger.info("Nombre de photos reçues : " + files.size());
//        logger.info("Détails du job : " + jobDTO);
//        System.out.println( "print Détails du job : "+jobDTO);
//
//        // jobService.createJob(jobDTO, files);
//        return ResponseEntity.ok(jobDTO);
//    }


}
