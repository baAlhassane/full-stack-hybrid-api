package com.alhas.hybrid_api.picture;

import com.alhas.hybrid_api.job.Job;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "jobPictureSequenceGenerator")
    @SequenceGenerator(name = "jobPictureSequenceGenerator",sequenceName = "job_picture_generator", allocationSize = 1)
    @Column(name = "id")
    private  Long id;

    @ManyToOne
    @JoinColumn(name = "job_fk" ,  referencedColumnName = "job_id")
    private Job jobListing;

    @Lob
    @Column(name ="file" ,nullable = false)
    private byte[] file;

    @Column(name = "file_content_type")
    private String fileContentType;

    @Column(name = "name")
    private String name;

//    @Column(name = "is_cover")
//    private boolean isCover;

}
