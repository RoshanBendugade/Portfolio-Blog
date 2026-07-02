import {
  FaJava,
  FaReact,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiSpringboot,
  SiMysql,
  SiTailwindcss,
} from "react-icons/si";

const skills = [
  {
    name: "Java",
    icon: FaJava,
    color: "text-orange-500",
    level: 90,
  },
  {
    name: "Spring Boot",
    icon: SiSpringboot,
    color: "text-green-500",
    level: 85,
  },
  {
    name: "React",
    icon: FaReact,
    color: "text-cyan-500",
    level: 85,
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "text-blue-500",
    level: 80,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-sky-500",
    level: 85,
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "text-red-500",
    level: 80,
  },
];

export default skills;