package com.roshan.portfolio.blog.Controller;

import com.roshan.portfolio.blog.Service.ContactService;
import com.roshan.portfolio.blog.entity.Contact;
import com.roshan.portfolio.blog.Repository.ContactRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    private final ContactService service;
    private final ContactRepository contactRepository;

    public ContactController(
            ContactService service,
            ContactRepository contactRepository) {
        this.service = service;
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public Contact saveContact(
            @RequestBody Contact contact) {

        return service.saveContact(contact);
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {

        contactRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public List<Contact> getContacts() {
        return service.getAllContacts();
    }
}