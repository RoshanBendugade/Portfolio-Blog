package com.roshan.portfolio.blog.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
    @Table(name = "contacts")
    public class Contact {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Setter
        private String name;

        @Setter
        private String email;

        @Setter
        @Column(length = 1000)
        private String message;

        public Contact() {
        }

}

