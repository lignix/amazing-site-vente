package com.goat.site_vente.service;

import com.goat.site_vente.entity.ObjectForSale;
import com.goat.site_vente.repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {

    @Autowired
    private ObjectRepository objectRepository;

    // 1. Récupérer tous les objets
    public List<ObjectForSale> getAllObjects() {
        return objectRepository.findAll();
    }

    // 2. Récupérer un objet par son ID
    public Optional<ObjectForSale> getObjectById(Long id) {
        return objectRepository.findById(id);
    }

    // 3. Créer un nouvel objet
    public ObjectForSale createObject(ObjectForSale objectForSale) {
        return objectRepository.save(objectForSale);
    }

    // 4. Mettre à jour un objet
    public ObjectForSale updateObject(Long id, ObjectForSale objectForSale) {
        if (objectRepository.existsById(id)) {
            objectForSale.setId(id); // Assurer que l'ID est bien celui de l'objet à mettre à jour
            return objectRepository.save(objectForSale);
        }
        return null; // Ou lancer une exception pour indiquer que l'objet n'existe pas
    }

    // 5. Supprimer un objet
    public void deleteObject(Long id) {
        objectRepository.deleteById(id);
    }
}
