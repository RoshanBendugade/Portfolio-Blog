
package com.roshan.portfolio.blog.mapper;

import com.roshan.portfolio.blog.entity.Contact;
import com.roshan.portfolio.blog.dto.response.ContactResponse;

public class ContactMapper {

    private ContactMapper() {
    }

    public static ContactResponse toResponse(Contact contact) {

        return new ContactResponse(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getSubject(),
                contact.getMessage()
        );
    }
}
