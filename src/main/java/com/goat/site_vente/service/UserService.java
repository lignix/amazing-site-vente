package com.goat.site_vente.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.goat.site_vente.entity.User;
import com.goat.site_vente.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String login, String password, String city) {
        if (userRepository.existsByLogin(login)) {
            throw new IllegalArgumentException("Cet utilisateur existe déjà");
        }
        if (login == null || login.equals("")) {
            throw new IllegalArgumentException("Le login ne peut pas être vide");
        }
        if (password == null || password.equals("")) {
            throw new IllegalArgumentException("Le mot de passe ne peut pas être vide");
        }
        if (city == null || city.equals("")) {
            throw new IllegalArgumentException("Le champ ville est obligatoire");
        }
        User user = new User();
        user.setLogin(login);
        user.setPassword(passwordEncoder.encode(password));
        user.setCity(city);
        return userRepository.save(user);
    }

    public boolean isAdmin(String login) {
        User user = userRepository.findByLogin(login);
        if (user == null) {
            throw new IllegalArgumentException("Utilisateur introuvable");
        }
        return user.isAdmin();
    }

}
