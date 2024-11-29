package com.adp.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adp.backend.services.ProductService;

@RestController
@RequestMapping("/api")
public class productContoller {
    @Autowired
    private ProductService service;
    @GetMapping("/")
    public String greet(){
        return "welcome!!!";
    }
    
    
}
