package com.adp.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.adp.backend.ProductRepo;
import com.adp.backend.models.Product;

@Service
public class ProductService {
    @Autowired 
     private  ProductRepo repo;
     public List<Product> getAllProducts(){
        return repo.findAll();
     }
    }
