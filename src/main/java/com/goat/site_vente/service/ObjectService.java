package com.goat.site_vente.service;

import com.goat.site_vente.DTO.ObjectForSaleDTO;
import com.goat.site_vente.entity.ObjectForSale;
import com.goat.site_vente.entity.User;
import com.goat.site_vente.repository.ObjectRepository;
import com.goat.site_vente.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {

    @Autowired
    private ObjectRepository objectRepository;
    @Autowired
    private UserRepository userRepository;

    public List<ObjectForSale> getAllObjects() {
        return objectRepository.findAll();
    }

    public List<ObjectForSale> getObjectsByLogin(String login) {
        return objectRepository.findByUserLogin(login);
    }

    public ObjectForSale createObjectForSale(ObjectForSaleDTO request, String login) {
        User user = userRepository.findByLogin(login);
        ObjectForSale objectForSale = new ObjectForSale();
        objectForSale.setDescription(request.getDescription());
        objectForSale.setPrice(request.getPrice());
        objectForSale.setUser(user);
        objectForSale.setSold(false);

        return objectRepository.save(objectForSale);
    }

    public ObjectForSale markObjectAsSold(Long id, String buyerLogin) {
        Optional<ObjectForSale> optionalObject = objectRepository.findById(id);

        if (optionalObject.isPresent()) {
            ObjectForSale object = optionalObject.get();

            object.setSold(true);
            object.setSaleDate(LocalDateTime.now());
            object.setBuyerName(buyerLogin);

            return objectRepository.save(object);
        }
        return null;
    }

    public void deleteObject(Long id) {
        objectRepository.deleteById(id);
    }
}