package com.goat.site_vente.controller;

import com.goat.site_vente.DTO.ObjectForSaleDTO;
import com.goat.site_vente.entity.ObjectForSale;
import com.goat.site_vente.service.ObjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/objects")
public class ObjectController {

    @Autowired
    private ObjectService objectService;

    // Récupérer tous les objets
    @GetMapping
    public List<ObjectForSale> getAllObjects() {
        return objectService.getAllObjects();
    }

    // Récupérer un objet spécifique par son ID
    @GetMapping("/{id}")
    public Optional<ObjectForSale> getObjectById(@PathVariable Long id) {
        return objectService.getObjectById(id);
    }

    // Créer un nouvel objet
    @PostMapping("/create")
    public ResponseEntity<ObjectForSale> createObjectForSale(
            @RequestBody ObjectForSaleDTO request,
            @RequestHeader("login") String login) {

        ObjectForSale objectForSale = objectService.createObjectForSale(request, login);
        return ResponseEntity.ok(objectForSale);
    }

    // Supprimer un objet
    @DeleteMapping("/{id}")
    public void deleteObject(@PathVariable Long id) {
        objectService.deleteObject(id);
    }
}
