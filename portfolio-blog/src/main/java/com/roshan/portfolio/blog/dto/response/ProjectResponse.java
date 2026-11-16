
package com.roshan.portfolio.blog.dto.response;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        String imageUrl,
        String githubUrl,
        String liveUrl,
        String technologies,
        Boolean featured
) {
}
