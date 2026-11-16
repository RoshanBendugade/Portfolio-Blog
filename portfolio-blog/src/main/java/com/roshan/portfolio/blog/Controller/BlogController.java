
package com.roshan.portfolio.blog.Controller;

import com.roshan.portfolio.blog.Service.BlogService;
import com.roshan.portfolio.blog.entity.Blog;
import com.roshan.portfolio.blog.dto.response.BlogResponse;
import com.roshan.portfolio.blog.mapper.BlogMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public Page<BlogResponse> getAllBlogs(
            @PageableDefault(
                    size = 10,
                    sort = "id",
                    direction = Sort.Direction.DESC
            ) Pageable pageable) {

        return blogService.getAllBlogs(pageable)
                .map(BlogMapper::toResponse);
    }

    @PostMapping
    public BlogResponse createBlog(@RequestBody Blog blog) {

        Blog savedBlog = blogService.saveBlog(blog);

        return BlogMapper.toResponse(savedBlog);
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable Long id) {

        blogService.deleteBlog(id);
    }

    @PutMapping("/{id}")
    public BlogResponse updateBlog(
            @PathVariable Long id,
            @RequestBody Blog blog) {

        Blog updatedBlog = blogService.updateBlog(id, blog);

        return BlogMapper.toResponse(updatedBlog);
    }
}
