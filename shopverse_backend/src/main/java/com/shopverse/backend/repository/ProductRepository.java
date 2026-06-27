package com.shopverse.backend.repository;

import com.shopverse.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

// JpaRepository extend karne se ye sab methods free milte hain:
// findAll()      - saare products laao
// findById(id)   - ek product laao
// save(product)  - product save/update karo
// deleteById(id) - product delete karo
// Koi SQL likhne ki zaroorat nahi!
public interface ProductRepository extends JpaRepository<Product, Long> {
}
