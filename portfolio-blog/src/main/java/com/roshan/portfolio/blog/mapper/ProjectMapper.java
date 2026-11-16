
package com.roshan.portfolio.blog.mapper;

import com.roshan.portfolio.blog.entity.Project;
import com.roshan.portfolio.blog.dto.response.ProjectResponse;

public class ProjectMapper {

    private ProjectMapper() {
    }

    public static ProjectResponse toResponse(Project project) {

        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getImageUrl(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getTechnologies(),
                project.getFeatured()
        );
    }
}
