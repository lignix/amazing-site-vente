package com.goat.site_vente.service;

import com.goat.site_vente.DTO.ObjectForSaleDTO;
import com.goat.site_vente.entity.ObjectForSale;
import com.goat.site_vente.entity.User;
import com.goat.site_vente.repository.ObjectRepository;
import com.goat.site_vente.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {

    @Autowired
    private ObjectRepository objectRepository;
    @Autowired
    private UserRepository userRepository;

    // Récupérer tous les objets
    public List<ObjectForSale> getAllObjects() {
        return objectRepository.findAll();
    }

    // Récupérer un objet par son ID
    public Optional<ObjectForSale> getObjectById(Long id) {
        return objectRepository.findById(id);
    }

    // Récupérer les objets d'un utilisateur
    public List<ObjectForSale> getObjectsByLogin(String login) {
        return objectRepository.findByUserLogin(login);
    }

    // Créer un nouvel objet
    public ObjectForSale createObjectForSale(ObjectForSaleDTO request, String login) {
        User user = userRepository.findByLogin(login);
        ObjectForSale objectForSale = new ObjectForSale();
        objectForSale.setDescription(request.getDescription());
        objectForSale.setPrice(request.getPrice());
        objectForSale.setUser(user);
        objectForSale.setSold(false);

        return objectRepository.save(objectForSale);
    }

    // Supprimer un objet
    public void deleteObject(Long id) {
        objectRepository.deleteById(id);
    }
}
