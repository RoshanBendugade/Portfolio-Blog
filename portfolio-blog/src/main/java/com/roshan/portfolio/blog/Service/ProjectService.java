package com.roshan.portfolio.blog.Service;

import com.roshan.portfolio.blog.entity.Project;
import com.roshan.portfolio.blog.Repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Project saveProject(Project project) {
        return repository.save(project);
    }

    public void deleteProject(Long id) {
        repository.deleteById(id);
    }

    public Project updateProject(Long id, Project updatedProject) {

        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        project.setTitle(updatedProject.getTitle());
        project.setDescription(updatedProject.getDescription());
        project.setGithubUrl(updatedProject.getGithubUrl());
        project.setLiveUrl(updatedProject.getLiveUrl());
        project.setImageUrl(updatedProject.getImageUrl());
        project.setTechnologies(updatedProject.getTechnologies());
        project.setFeatured(updatedProject.getFeatured());

        return repository.save(project);
    }

}