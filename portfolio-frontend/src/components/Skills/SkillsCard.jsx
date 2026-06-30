function SkillsCard({ icon, name, level }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="text-5xl mb-5 flex justify-center">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-center dark:text-white">
        {name}
      </h3>

      <div className="mt-5">
        <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full"
            style={{ width: `${level}%` }}
          ></div>
        </div>

        <p className="text-center mt-3 text-gray-500 dark:text-gray-400">
          {level}%
        </p>
      </div>
    </div>
  );
}

export default SkillsCard;