package com.goat.site_vente.DTO;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ObjectForSaleDTO {
    private String description;
    private BigDecimal price;
}
