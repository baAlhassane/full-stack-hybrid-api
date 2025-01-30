package com.alhas.hybrid_api.jobber;

import com.alhas.hybrid_api.comment.Comment;
import com.alhas.hybrid_api.job.Job;
import com.alhas.hybrid_api.notification.Notification;
import com.alhas.hybrid_api.user.User;


import java.time.OffsetDateTime;
import java.util.List;

public class Jobber extends User {
    private  String speciality;
    private  List<String> skills;
    private  String ribUrl;
    private  List<Comment> comments;
    private  List<Job> jobs;
    private  int suggestionPricePerHours;
    private OffsetDateTime startDateTime;
    private OffsetDateTime endDateTime;
    private Notification notification;
    private boolean disponibility;


}
