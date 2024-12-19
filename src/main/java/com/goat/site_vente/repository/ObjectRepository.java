package com.goat.site_vente.repository;

import com.goat.site_vente.entity.ObjectForSale;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ObjectRepository extends JpaRepository<ObjectForSale, Long> {
    // Vous pouvez ajouter des méthodes de recherche personnalisées ici si
    // nécessaire
}
