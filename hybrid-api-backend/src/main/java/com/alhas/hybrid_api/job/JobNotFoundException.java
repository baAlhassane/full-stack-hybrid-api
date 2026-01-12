package com.alhas.hybrid_api.job;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException(String publicId) {
        super("Job with publicId " + publicId + " does not exist");
    }
}
