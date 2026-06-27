package com.shopverse.backend.controller;

import com.shopverse.backend.model.Product;
import com.shopverse.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController: ye class REST API endpoints handle karegi
// @RequestMapping: saare endpoints /api/products se shuru honge
// @CrossOrigin: Angular (localhost:4200) ko is API call karne ki permission
@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201", "http://localhost:4202"})
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // GET /api/products - saare products laao
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET /api/products/1 - ek product ID se laao
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // POST /api/products - naya product banao
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // DELETE /api/products/1 - product delete karo
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
