import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

import ProjectCard from "./ProjectCard";

import projects from "../../constants/projects";

function Projects() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={index * 0.15}
            >
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                github={project.github}
                live={project.live}
              />
            </FadeIn>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default Projects;