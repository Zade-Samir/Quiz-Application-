package com.capgi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
// @EnableDiscoveryClient
public class AttemptServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AttemptServiceApplication.class, args);
	}

}
