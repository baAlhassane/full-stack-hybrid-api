package com.alhas.hybrid_api.job;

import com.alhas.hybrid_api.users.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface JobRepository extends JpaRepository<Job, Long> {

    Optional<Job> findOneByJobPublicId(UUID publicId);
//    <verbe><quantificateur>By<Attribut><Opérateur>[And|Or<Attribut>...]

}
