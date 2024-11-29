package com.adp.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.adp.backend.models.product;
@Repository
 interface ProductRepo  extends  JpaRepository<product,Integer> {
    
}
