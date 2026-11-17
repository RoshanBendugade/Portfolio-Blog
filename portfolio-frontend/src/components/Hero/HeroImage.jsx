
import { motion } from "framer-motion";
import profile from "../../assets/images/profile.png";

function HeroImage() {
  return (
    <div className="relative w-full h-full min-h-[350px]
      flex items-center justify-center">

      {/* Decorative Background */}

      <div className="absolute w-64 h-64 sm:w-80 sm:h-80
        bg-teal-300/40 dark:bg-teal-500/20
        rounded-full blur-3xl"></div>

      {/* Profile Image */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <img
          src={profile}
          alt="Roshan Bendugade"
          className="w-64 h-72 sm:w-72 sm:h-80
            lg:w-80 lg:h-[400px]
            object-cover object-center
            rounded-[28px]
            border-8 border-white/70
            dark:border-slate-700
            shadow-2xl"
        />
      </motion.div>

      {/* Floating Label */}

      <div className="absolute bottom-3 left-0 sm:left-2
        z-20 bg-white dark:bg-slate-900
        rounded-2xl p-4 shadow-xl
        border border-gray-100 dark:border-slate-700">

        <p className="text-xs text-gray-500 dark:text-gray-400">
          My focus
        </p>

        <p className="font-bold text-gray-900 dark:text-white">
          Building & Learning
        </p>

      </div>

      {/* Developer Badge */}

      <div className="absolute top-4 right-2 sm:right-4
        bg-white dark:bg-slate-900
        px-4 py-2 rounded-xl shadow-md
        text-sm font-semibold
        text-teal-700 dark:text-teal-400">
        Developer
      </div>

    </div>
  );
}

export default HeroImage;
