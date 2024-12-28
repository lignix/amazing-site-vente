package com.goat.site_vente.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll() // Autoriser toutes les requêtes
                )
                .formLogin() // Utiliser un formulaire de connexion classique
                .permitAll()
                .and()
                .httpBasic(); // Optionnel, si tu veux aussi autoriser l'authentification basique
        return http.build();
    }
}
