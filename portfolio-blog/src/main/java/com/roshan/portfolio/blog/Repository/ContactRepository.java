package com.roshan.portfolio.blog.Repository;

import com.roshan.portfolio.blog.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository
        extends JpaRepository<Contact, Long> {
}