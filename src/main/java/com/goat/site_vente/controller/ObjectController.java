package com.goat.site_vente.controller;

import com.goat.site_vente.entity.ObjectForSale;
import com.goat.site_vente.service.ObjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/objects")
public class ObjectController {

    @Autowired
    private ObjectService objectService;

    // 1. Récupérer tous les objets
    @GetMapping
    public List<ObjectForSale> getAllObjects() {
        return objectService.getAllObjects();
    }

    // 2. Récupérer un objet spécifique par son ID
    @GetMapping("/{id}")
    public Optional<ObjectForSale> getObjectById(@PathVariable Long id) {
        return objectService.getObjectById(id);
    }

    // 3. Créer un nouvel objet
    @PostMapping
    public ObjectForSale createObject(@RequestBody ObjectForSale objectForSale) {
        return objectService.createObject(objectForSale);
    }

    // 4. Mettre à jour un objet (marquer comme vendu)
    @PutMapping("/{id}")
    public ObjectForSale updateObject(@PathVariable Long id, @RequestBody ObjectForSale objectForSale) {
        return objectService.updateObject(id, objectForSale);
    }

    // 5. Supprimer un objet
    @DeleteMapping("/{id}")
    public void deleteObject(@PathVariable Long id) {
        objectService.deleteObject(id);
    }
}
