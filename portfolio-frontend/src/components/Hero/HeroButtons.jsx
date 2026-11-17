
import { FaArrowRight, FaEnvelope } from "react-icons/fa6";

function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4 mt-8">

      <a
        href="#projects"
        className="inline-flex items-center justify-center gap-3
          px-6 py-3.5 rounded-xl
          bg-[#087f70] hover:bg-[#06675c]
          text-white font-semibold
          shadow-lg shadow-teal-900/10
          hover:-translate-y-1 transition-all duration-300"
      >
        View Projects
        <FaArrowRight size={14} />
      </a>

      <a
        href="#contact"
        className="inline-flex items-center justify-center gap-3
          px-6 py-3.5 rounded-xl
          border border-gray-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-gray-800 dark:text-white
          font-semibold hover:border-teal-600
          hover:-translate-y-1 transition-all duration-300"
      >
        <FaEnvelope size={15} />
        Contact Me
      </a>

    </div>
  );
}

export default HeroButtons;
