package com.roshan.portfolio.blog.Controller;

import com.roshan.portfolio.blog.Service.ContactService;
import com.roshan.portfolio.blog.entity.Contact;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    public Contact saveContact(
            @RequestBody Contact contact) {

        return service.saveContact(contact);
    }

    @GetMapping
    public List<Contact> getContacts() {
        return service.getAllContacts();
    }
}