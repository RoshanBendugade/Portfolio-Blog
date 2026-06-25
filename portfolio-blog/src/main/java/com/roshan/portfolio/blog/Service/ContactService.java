package com.roshan.portfolio.blog.Service;

import com.roshan.portfolio.blog.Repository.ContactRepository;
import com.roshan.portfolio.blog.entity.Contact;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public Contact saveContact(Contact contact) {
        return repository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return repository.findAll();
    }
}