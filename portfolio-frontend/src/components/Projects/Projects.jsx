
import { useCallback, useEffect, useState } from "react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";
import ProjectCard from "./ProjectCard";
import AsyncState from "../ui/AsyncState";

import api from "../../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/projects");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content ||
          response.data?.projects ||
          [];

      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Unable to load projects. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <section
      id="projects"
      className="py-24 bg-gray-100 dark:bg-[#111827] transition-colors duration-300"
    >
      <Container>
        <SectionHeading
          subtitle="Projects"
          title="My Recent Work"
          description="Here are some of my recent projects built using Java, Spring Boot, React and MySQL."
        />

        <AsyncState
          loading={loading}
          error={error}
          isEmpty={projects.length === 0}
          onRetry={fetchProjects}
          emptyTitle="No Projects Yet"
          emptyDescription="I'm currently working on exciting projects. Check back soon to explore my work."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const technologies = Array.isArray(project.technologies)
                ? project.technologies
                : (project.technologies || "")
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean);

              return (
                <FadeIn
                  key={project.id}
                  delay={index * 0.15}
                >
                  <ProjectCard
                    image={project.imageUrl || "/portfolio.png"}
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
      </Container>
    </section>
  );
}

export default Projects;
