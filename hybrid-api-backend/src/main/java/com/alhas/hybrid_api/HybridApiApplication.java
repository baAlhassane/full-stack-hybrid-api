package com.alhas.hybrid_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class HybridApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(HybridApiApplication.class, args);
	}

}
