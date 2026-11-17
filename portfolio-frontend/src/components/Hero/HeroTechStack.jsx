
import skills from "../../constants/skills";

function HeroTechStack() {
  return (
    <div>

      {/* Section Heading */}

      <div className="flex flex-col sm:flex-row
        sm:items-center sm:justify-between gap-2 mb-6">

        <div>
          <p className="text-sm font-semibold
            text-teal-700 dark:text-teal-400 uppercase
            tracking-wider">
            My toolkit
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Technologies I work with
          </h2>
        </div>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          Always learning something new
        </span>

      </div>

      {/* Technology Grid */}

      <div className="grid grid-cols-2 sm:grid-cols-3
        lg:grid-cols-6 gap-3">

        {skills.map((skill) => {
          const Icon = skill.icon;

          return (
            <div
              key={skill.name}
              className="flex items-center justify-center
                sm:justify-start gap-2
                px-3 sm:px-4 py-3 rounded-xl
                bg-[#f7f7f4] dark:bg-slate-800
                border border-gray-200 dark:border-slate-700
                hover:border-teal-500
                hover:-translate-y-1
                transition-all duration-300"
            >

              <Icon className={`${skill.color} text-xl shrink-0`} />

              <span className="text-sm font-semibold
                text-gray-700 dark:text-gray-200">
                {skill.name}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default HeroTechStack;
