
package com.roshan.portfolio.blog.dto.response;

public record ContactResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message
) {
}
