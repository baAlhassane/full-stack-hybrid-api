package com.alhas.hybrid_api.user;

import com.alhas.hybrid_api.user.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
