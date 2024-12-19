package com.goat.site_vente;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.goat.site_vente.entity")
public class SiteVenteApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiteVenteApplication.class, args);
	}

}
