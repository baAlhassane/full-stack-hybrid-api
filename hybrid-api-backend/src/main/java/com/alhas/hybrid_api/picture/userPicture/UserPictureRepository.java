package com.alhas.hybrid_api.picture.userPicture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface UserPictureRepository extends JpaRepository<UserPicture, Long> {
}
