package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.users.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
