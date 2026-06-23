package com.roshan.portfolio.blog.Repository;

    import com.roshan.portfolio.blog.entity.Project;
    import org.springframework.data.jpa.repository.JpaRepository;

    public interface ProjectRepository extends JpaRepository<Project, Long> {
    }