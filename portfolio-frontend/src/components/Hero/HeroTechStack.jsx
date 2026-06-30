import skills from "../../constants/skills";
import Badge from "../ui/Badge";

function HeroTechStack() {
  return (
    <div className="flex flex-wrap gap-4 mt-10">
      {skills.map((skill) => {
        const Icon = skill.icon;

        return (
          <Badge key={skill.name}>
            <Icon className={`${skill.color} text-lg`} />
            <span>{skill.name}</span>
          </Badge>
        );
      })}
    </div>
  );
}

export default HeroTechStack;