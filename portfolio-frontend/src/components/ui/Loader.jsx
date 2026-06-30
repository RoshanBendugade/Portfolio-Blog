import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-slate-950">

      <div className="text-center">

        {/* Logo */}

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mx-auto w-28 h-28"
        >

          {/* Rotating Ring */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent"
          />

          {/* Initials */}

          <div className="absolute inset-0 flex items-center justify-center">

            <h1 className="text-4xl font-bold text-orange-500">
              RB
            </h1>

          </div>

        </motion.div>

        {/* Loading Text */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="mt-8 text-lg font-medium text-gray-600 dark:text-gray-300"
        >
          Loading Portfolio...
        </motion.p>

      </div>

    </div>
  );
}

export default Loader;