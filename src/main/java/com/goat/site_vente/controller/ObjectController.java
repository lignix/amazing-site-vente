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

    // Récupérer les objets d'un utilisateur
    @GetMapping("/my")
    public ResponseEntity<List<ObjectForSale>> getObjectsByLogin(@RequestHeader("login") String login) {
        List<ObjectForSale> objects = objectService.getObjectsByLogin(login);
        return ResponseEntity.ok(objects);
    }

    // Créer un nouvel objet
    @PostMapping("/create")
    public ResponseEntity<ObjectForSale> createObjectForSale(
            @RequestBody ObjectForSaleDTO request,
            @RequestHeader("login") String login) {

        ObjectForSale objectForSale = objectService.createObjectForSale(request, login);
        return ResponseEntity.ok(objectForSale);
    }

    // Marquer un objet comme vendu
    @PatchMapping("/{id}")
    public ResponseEntity<ObjectForSale> markObjectAsSold(@PathVariable Long id) {
        ObjectForSale updatedObject = objectService.markObjectAsSold(id);
        if (updatedObject != null) {
            return ResponseEntity.ok(updatedObject); // Retourner l'objet mis à jour
        } else {
            return ResponseEntity.notFound().build(); // Retourner 404 si l'objet n'est pas trouvé
        }
    }

    // Supprimer un objet
    @DeleteMapping("/{id}")
    public void deleteObject(@PathVariable Long id) {
        objectService.deleteObject(id);
    }
}
