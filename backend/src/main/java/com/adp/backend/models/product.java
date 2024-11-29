package com.adp.backend.models;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    private int id;
    private String desc;
    private String name;
    private String category;
    private Date realeseDate;
    private int price;
    private String brand;
    private boolean available;
    
}
