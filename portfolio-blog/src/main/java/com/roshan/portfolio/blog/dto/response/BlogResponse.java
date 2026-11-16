
package com.roshan.portfolio.blog.dto.response;

public record BlogResponse(
        Long id,
        String title,
        String content,
        String author,
        String imageUrl,
        String category,
        Integer readTime,
        Boolean featured
) {
}

