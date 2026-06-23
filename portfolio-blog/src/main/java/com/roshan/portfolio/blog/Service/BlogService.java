package com.roshan.portfolio.blog.Service;

import com.roshan.portfolio.blog.Repository.BlogRepository;
import com.roshan.portfolio.blog.entity.Blog;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    private final BlogRepository repository;

    public BlogService(BlogRepository repository) {
        this.repository = repository;
    }

    public List<Blog> getAllBlogs() {
        return repository.findAll();
    }

    public Blog saveBlog(Blog blog) {
        return repository.save(blog);
    }

    public void deleteBlog(Long id) {
        repository.deleteById(id);
    }

    public Blog updateBlog(Long id, Blog updatedBlog) {

        Blog blog = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found"));

        blog.setTitle(updatedBlog.getTitle());
        blog.setContent(updatedBlog.getContent());
        blog.setAuthor(updatedBlog.getAuthor());

        return repository.save(blog);
    }
}