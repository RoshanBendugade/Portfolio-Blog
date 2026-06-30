package com.roshan.portfolio.blog.entity;

import jakarta.persistence.*;
        import lombok.Data;

@Entity
@Table(name = "projects")
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String imageUrl;

    private String githubUrl;

    private String liveUrl;

    private String technologies;

    private Boolean featured;
}