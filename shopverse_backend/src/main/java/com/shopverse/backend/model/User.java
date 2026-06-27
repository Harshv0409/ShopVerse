package com.shopverse.backend.model;

import jakarta.persistence.*;
import lombok.Data;

// User table — register hone wale sabhi users yahan store honge
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true) // ek email se ek hi account
    private String email;

    private String password; // BCrypt encrypted rahega

    private String role; // BUYER ya SELLER
}
