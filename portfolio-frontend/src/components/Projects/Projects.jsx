import { useCallback, useEffect, useMemo, useState } from "react";

import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import AsyncState from "../ui/AsyncState";
import ProjectCard from "./ProjectCard";

import api from "../../services/api";

const parseTechnologies = (value) =>
  Array.isArray(value)
    ? value
    : (value || "")
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTag, setActiveTag] = useState("all");

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

  const items = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        techList: parseTechnologies(project.technologies),
      })),
    [projects]
  );

  // Filter tags = technologies used by at least 2 projects (max 6)
  const tags = useMemo(() => {
    const counts = new Map();

    items.forEach((project) => {
      project.techList.forEach((tech) => {
        const key = tech.toLowerCase();
        const entry = counts.get(key) || { label: tech, count: 0 };
        entry.count += 1;
        counts.set(key, entry);
      });
    });

    return [...counts.entries()]
      .filter(([, entry]) => entry.count >= 2)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 6)
      .map(([key, entry]) => ({ key, label: entry.label }));
  }, [items]);

  // The filter bar only appears when there are enough projects to need it
  const showFilters = items.length >= 4 && tags.length >= 2;

  const visible =
    activeTag === "all"
      ? items
      : items.filter((project) =>
          project.techList.some((tech) => tech.toLowerCase() === activeTag)
        );

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
          {showFilters && (
            <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {[{ key: "all", label: "All" }, ...tags].map((tag) => {
                const isActive = activeTag === tag.key;

                return (
                  <button
                    key={tag.key}
                    onClick={() => setActiveTag(tag.key)}
                    aria-pressed={isActive}
                    className={`chip transition-colors ${
                      isActive
                        ? "!border-transparent !bg-[var(--fill)] !text-white"
                        : "hover:border-[var(--accent)]"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((project, index) => (
              <FadeIn key={project.id} delay={Math.min(index, 3) * 0.08}>
                <ProjectCard
                  image={project.imageUrl}
                  title={project.title}
                  description={project.description}
                  technologies={project.techList}
                  github={project.githubUrl}
                  live={project.liveUrl}
                />
              </FadeIn>
            ))}
          </div>
        </AsyncState>
      </div>
    </section>
  );
}

export default Projects;