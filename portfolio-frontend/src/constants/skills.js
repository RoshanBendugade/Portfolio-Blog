import { FaJava, FaReact, FaGitAlt } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiTailwindcss } from "react-icons/si";

const skills = [
  { name: "Java", icon: FaJava, group: "Backend" },
  { name: "Spring Boot", icon: SiSpringboot, group: "Backend" },
  { name: "MySQL", icon: SiMysql, group: "Backend" },
  { name: "React", icon: FaReact, group: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, group: "Frontend" },
  { name: "Git", icon: FaGitAlt, group: "Tools" },
];

export const skillGroups = ["Backend", "Frontend", "Tools"].map((title) => ({
  title,
  items: skills.filter((skill) => skill.group === title),
}));

export const exploring = [
  "Docker",
  "Kubernetes",
  "Cloud computing",
  "System design",
];

export default skills;