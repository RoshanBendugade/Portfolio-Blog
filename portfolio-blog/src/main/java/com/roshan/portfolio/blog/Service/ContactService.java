package com.roshan.portfolio.blog.Service;

import com.roshan.portfolio.blog.Repository.ContactRepository;
import com.roshan.portfolio.blog.entity.Contact;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    public Page<Contact> getAllContacts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Contact saveContact(Contact contact) {
        return repository.save(contact);
    }

    public List<Contact> getAllContacts() {
        return repository.findAll();
    }
}