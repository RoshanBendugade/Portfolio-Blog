import {
  FaJava,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaDocker,
} from "react-icons/fa";

import {
  SiSpringboot,
  SiMysql,
  SiTailwindcss,
  SiHibernate,
} from "react-icons/si";

function Skills() {
  const skills = [
    {
      name: "Java",
      icon: <FaJava />,
      color: "text-orange-500",
    },
    {
      name: "Spring Boot",
      icon: <SiSpringboot />,
      color: "text-green-500",
    },
    {
      name: "React",
      icon: <FaReact />,
      color: "text-cyan-400",
    },
    {
      name: "MySQL",
      icon: <SiMysql />,
      color: "text-blue-500",
    },
    {
      name: "Hibernate",
      icon: <SiHibernate />,
      color: "text-yellow-500",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss />,
      color: "text-sky-400",
    },
    {
      name: "Git",
      icon: <FaGitAlt />,
      color: "text-red-500",
    },
    {
      name: "GitHub",
      icon: <FaGithub />,
      color: "text-gray-700 dark:text-white",
    },
    {
      name: "Docker",
      icon: <FaDocker />,
      color: "text-blue-400",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 bg-white dark:bg-[#0B1120] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="text-orange-500 uppercase tracking-widest">
            My Skills
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Technologies I Work With
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                bg-gray-100
                dark:bg-slate-800
                rounded-2xl
                p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                text-center
              "
            >
              <div className={`text-5xl mb-4 ${skill.color}`}>
                {skill.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {skill.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Skills;