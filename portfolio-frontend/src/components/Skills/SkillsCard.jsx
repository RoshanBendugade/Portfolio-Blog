
function SkillsCard({ icon: Icon, name, level, color }) {
  return (
    <div
      className="group h-full min-h-[230px]
        bg-white dark:bg-slate-900
        rounded-[26px] p-7
        border border-gray-200 dark:border-slate-800
        shadow-sm hover:shadow-xl
        hover:border-teal-500
        hover:-translate-y-2
        transition-all duration-300"
    >

      {/* Icon */}

      <div className="flex items-center justify-between">

        <div className="w-16 h-16 rounded-2xl
          bg-[#f7f7f4] dark:bg-slate-800
          flex items-center justify-center
          group-hover:bg-teal-50
          dark:group-hover:bg-teal-950
          transition-colors duration-300">

          <Icon className={`${color} text-3xl`} />

        </div>

        <span className="text-sm font-semibold
          text-gray-400 dark:text-gray-500">
          TECH
        </span>

      </div>

      {/* Skill Name */}

      <h3 className="text-2xl font-bold mt-7
        text-gray-900 dark:text-white">
        {name}
      </h3>

      {/* Skill Progress */}

      <div className="mt-5">

        <div className="flex items-center
          justify-between mb-2">

          <span className="text-sm text-gray-500
            dark:text-gray-400">
            Proficiency
          </span>

          <span className="text-sm font-bold
            text-teal-700 dark:text-teal-400">
            {level}%
          </span>

        </div>

        <div className="w-full h-2
          bg-gray-100 dark:bg-slate-800
          rounded-full overflow-hidden">

          <div
            className="h-full bg-teal-600
              rounded-full transition-all duration-700"
            style={{ width: `${level}%` }}
          />

        </div>

      </div>

    </div>
  );
}

export default SkillsCard;
