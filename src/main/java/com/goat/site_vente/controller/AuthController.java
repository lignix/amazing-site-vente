package com.goat.site_vente.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goat.site_vente.DTO.UserLoginDTO;
import com.goat.site_vente.entity.User;
import com.goat.site_vente.service.AuthService;

@RestController
@RequestMapping("/api/users")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody UserLoginDTO loginDTO) {
        try {
            // Authentifier l'utilisateur
            User user = authService.authenticateUser(loginDTO.getLogin(), loginDTO.getPassword());
            return ResponseEntity.ok(user); // Retourner l'objet User
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retourner une réponse d'erreur avec code
                                                                             // 400
        }
    }
}
