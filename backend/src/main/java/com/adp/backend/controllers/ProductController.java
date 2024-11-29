package com.adp.backend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adp.backend.models.Product;
import com.adp.backend.services.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/")
    public String greet() {
        return "Welcome!!!";
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    // New endpoint to get a product by its id
    @GetMapping("/product/{id}")
    public Product getProductById(@PathVariable int id) {
        Optional<Product> product = service.getProductById(id);
        return product.orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }
}
