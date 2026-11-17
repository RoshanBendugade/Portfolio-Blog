import { useCallback, useEffect, useState } from "react";

import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import AsyncState from "../ui/AsyncState";
import ProjectCard from "./ProjectCard";

import api from "../../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from Spring Boot API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || response.data?.projects || [];

      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        "Unable to load projects. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of applications and solutions built with modern technologies."
        />

        <AsyncState
          loading={loading}
          error={error}
          isEmpty={projects.length === 0}
          onRetry={fetchProjects}
          emptyTitle="No projects yet"
          emptyDescription="I'm working on new projects. Check back soon."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : (project.technologies || "")
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean);

              return (
                <FadeIn key={project.id} delay={Math.min(index, 3) * 0.08}>
                  <ProjectCard
                    image={project.imageUrl}
                    title={project.title}
                    description={project.description}
                    technologies={technologies}
                    github={project.githubUrl}
                    live={project.liveUrl}
                  />
                </FadeIn>
              );
            })}
          </div>
        </AsyncState>
      </div>
    </section>
  );
}

export default Projects;