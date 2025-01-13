package com.goat.site_vente.repository;

import com.goat.site_vente.entity.ObjectForSale;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ObjectRepository extends JpaRepository<ObjectForSale, Long> {
    List<ObjectForSale> findByUserLogin(String login);
}
