import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import SkillsCard from "./SkillsCard";

import skills from "../../constants/skills";

function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <Container>
        <SectionHeading
          subtitle="Skills"
          title="Technologies I Work With"
          description="These are the technologies I use to build modern, scalable and responsive web applications."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <SkillsCard
                key={skill.name}
                icon={<Icon className={skill.color} />}
                name={skill.name}
                level={skill.level}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Skills;