package com.goat.site_vente.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goat.site_vente.DTO.UserRegistrationDTO;
import com.goat.site_vente.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDTO registrationDTO) {
        try {
            userService.registerUser(
                    registrationDTO.getLogin(),
                    registrationDTO.getPassword(),
                    registrationDTO.getCity());
            return ResponseEntity.ok("Utilisateur enregistré avec succès !");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<Boolean> isAdmin(@RequestHeader("login") String login) {
        try {
            boolean isAdmin = userService.isAdmin(login);
            return ResponseEntity.ok(isAdmin);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
    }

    @PostMapping("/admin-action")
    public ResponseEntity<String> performAdminAction(@RequestHeader("login") String login) {
        if (!userService.isAdmin(login)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Accès refusé : droits administrateur requis");
        }

        // Logique de l'action réservée aux administrateurs
        return ResponseEntity.ok("Action administrateur réalisée avec succès");
    }

}
