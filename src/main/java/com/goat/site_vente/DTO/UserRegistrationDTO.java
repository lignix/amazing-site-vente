package com.goat.site_vente.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserRegistrationDTO {
    @NotBlank
    private String login;

    @NotBlank
    private String password;

    @NotBlank
    private String city;
}
