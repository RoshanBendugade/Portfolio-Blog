package com.roshan.portfolio.blog.Controller;

import com.roshan.portfolio.blog.Service.BlogService;
import com.roshan.portfolio.blog.entity.Blog;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "http://localhost:5173")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogService.getAllBlogs();
    }

    @PostMapping
    public Blog createBlog(@RequestBody Blog blog) {
        return blogService.saveBlog(blog);
    }

    @DeleteMapping("/{id}")
    public void deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
    }

    @PutMapping("/{id}")
    public Blog updateBlog(
            @PathVariable Long id,
            @RequestBody Blog blog) {

        return blogService.updateBlog(id, blog);
    }
}