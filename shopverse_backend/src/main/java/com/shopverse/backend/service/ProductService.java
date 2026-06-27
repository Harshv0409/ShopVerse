package com.shopverse.backend.service;

import com.shopverse.backend.model.Product;
import com.shopverse.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// @Service: Spring ko batata hai ki ye ek service class hai
// @RequiredArgsConstructor: Lombok - constructor injection auto generate karta hai
@Service
@RequiredArgsConstructor
public class ProductService {

    // Repository inject ho rahi hai - database se baat karega
    private final ProductRepository productRepository;

    // Saare products database se laao
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Ek product ID se laao
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // Naya product save karo
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // Product delete karo
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
