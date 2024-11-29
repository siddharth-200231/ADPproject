package com.adp.backend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adp.backend.models.Product;  // Ensure 'Product' starts with an uppercase letter

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    // Custom query methods can be added here if needed
}
