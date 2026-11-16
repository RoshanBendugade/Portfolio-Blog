
package com.roshan.portfolio.blog.mapper;

import com.roshan.portfolio.blog.entity.Blog;
import com.roshan.portfolio.blog.dto.response.BlogResponse;

public class BlogMapper {

    private BlogMapper() {
    }

    public static BlogResponse toResponse(Blog blog) {

        return new BlogResponse(
                blog.getId(),
                blog.getTitle(),
                blog.getContent(),
                blog.getAuthor(),
                blog.getImageUrl(),
                blog.getCategory(),
                blog.getReadTime(),
                blog.getFeatured()
        );
    }
}
