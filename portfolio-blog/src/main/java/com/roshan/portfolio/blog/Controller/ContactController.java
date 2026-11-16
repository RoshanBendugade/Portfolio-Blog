
package com.roshan.portfolio.blog.Controller;

import com.roshan.portfolio.blog.Service.ContactService;
import com.roshan.portfolio.blog.entity.Contact;
import com.roshan.portfolio.blog.Repository.ContactRepository;
import com.roshan.portfolio.blog.dto.response.ContactResponse;
import com.roshan.portfolio.blog.mapper.ContactMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;


import java.util.List;

@RestController
@RequestMapping("/api/contact")
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
    public ContactResponse saveContact(
            @RequestBody Contact contact) {

        Contact savedContact = service.saveContact(contact);

        return ContactMapper.toResponse(savedContact);
    }

    @GetMapping
    public Page<ContactResponse> getContacts(
            @PageableDefault(
                    size = 10,
                    sort = "id",
                    direction = Sort.Direction.DESC
            ) Pageable pageable) {

        return service.getAllContacts(pageable)
                .map(ContactMapper::toResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteContact(
            @PathVariable Long id) {

        contactRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
