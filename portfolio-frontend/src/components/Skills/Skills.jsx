import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import { skillGroups, exploring } from "../../constants/skills";

function Skills() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="The tools I use to build modern, scalable and responsive applications."
        />

        <FadeIn>
          <div className="bento p-6 sm:p-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold text-muted">
                    {group.title}
                  </h3>

                  <ul className="mt-3">
                    {group.items.map((skill) => {
                      const Icon = skill.icon;

                      return (
                        <li
                          key={skill.name}
                          className="flex items-center gap-3 border-b border-line py-3 last:border-0"
                        >
                          <Icon className="text-xl text-accent" />
                          <span className="font-medium">{skill.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-6">
              <span className="mr-2 text-sm font-semibold text-accent">
                Currently exploring
              </span>

              {exploring.map((item) => (
                <span key={item} className="chip border-dashed">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default Skills;