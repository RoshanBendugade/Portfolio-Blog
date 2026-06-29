package com.roshan.portfolio.blog.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "blogs")
@Data
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String content;

    private String author;

    private String imageUrl;
    private String category;
    private Integer readTime;
    private Boolean featured;
}