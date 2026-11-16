
package com.roshan.portfolio.blog.Controller;

import com.roshan.portfolio.blog.dto.response.ProjectResponse;
import com.roshan.portfolio.blog.entity.Project;
import com.roshan.portfolio.blog.Service.ProjectService;
import com.roshan.portfolio.blog.mapper.ProjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping
    public Page<ProjectResponse> getAllProjects(
            @PageableDefault(
                    size = 10,
                    sort = "id",
                    direction = Sort.Direction.DESC
            ) Pageable pageable) {

        return service.getAllProjects(pageable)
                .map(ProjectMapper::toResponse);
    }

    @PostMapping
    public ProjectResponse createProject(
            @RequestBody Project project) {

        Project savedProject = service.saveProject(project);

        return ProjectMapper.toResponse(savedProject);
    }

    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable Long id) {

        service.deleteProject(id);
    }

    @PutMapping("/{id}")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {

        Project updatedProject = service.updateProject(id, project);

        return ProjectMapper.toResponse(updatedProject);
    }
}
