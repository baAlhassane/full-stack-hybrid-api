package com.alhas.hybrid_api;

import com.alhas.hybrid_api.users.user.authRessource.Authority;
import com.alhas.hybrid_api.users.user.authRessource.AuthorityRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

@SpringBootApplication
@EnableJpaRepositories
public class HybridApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HybridApiApplication.class, args);
	}


}
