package com.alhas.hybrid_api.jobber;

import com.alhas.hybrid_api.comment.Comment;
import com.alhas.hybrid_api.job.Job;
import com.alhas.hybrid_api.user.User;


import java.util.List;
import java.util.Map;

public class Jobber extends User {
    String speciality;
    List<String> skils;
    String ribUrl;
    List<Comment> comments;
    List<Job> jobs;
    int suggestionPricePerHours;



}
