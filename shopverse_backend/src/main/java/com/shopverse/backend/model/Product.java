package com.shopverse.backend.model;

import jakarta.persistence.*;
import lombok.Data;

// @Data: Lombok - auto generates getters, setters, constructor, toString
// @Entity: ye class ek database table hai
// @Table: database mein table ka naam "products" hoga
@Data
@Entity
@Table(name = "products")
public class Product {

    // Primary key - auto increment (1, 2, 3...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // product ka naam
    private String description; // product ki description
    private Double price;       // price in rupees
    private String image;       // image URL
    private String category;    // Electronics, Fashion, Home, etc.
    private Double rating;      // 1.0 to 5.0
}
