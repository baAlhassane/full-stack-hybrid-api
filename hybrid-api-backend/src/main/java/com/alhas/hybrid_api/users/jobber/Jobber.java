package com.alhas.hybrid_api.users.jobber;

import com.alhas.hybrid_api.comment.Comment;
import com.alhas.hybrid_api.job.Job;
import com.alhas.hybrid_api.users.user.User;
import jakarta.persistence.*;
import lombok.*;


import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;


@Entity
@DiscriminatorValue("JOBBER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Jobber extends User {

    private  String speciality;

    @Column(name ="rib_url" , nullable =  false)
    private  String ribUrl;

    private  int suggestionPricePerHours;
    private OffsetDateTime startDateTime;
    private OffsetDateTime endDateTime;

    private boolean disponibility;
    @Column(name = "skill")
    @ElementCollection
    @CollectionTable(name = "jobber_skills", joinColumns = @JoinColumn(name = "jobber_id"))
    private  List<String> skills;


    @OneToMany
    private  List<Comment> comments;
    @ManyToMany(mappedBy = "jobbers")
    private  Set<Job> jobs;


}
