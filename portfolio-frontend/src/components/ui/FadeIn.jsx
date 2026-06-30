import { motion } from "framer-motion";

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
}) {
  const variants = {
    up: {
      hidden: {
        opacity: 0,
        y: 60,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    },

    down: {
      hidden: {
        opacity: 0,
        y: -60,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    },

    left: {
      hidden: {
        opacity: 0,
        x: -60,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },

    right: {
      hidden: {
        opacity: 0,
        x: 60,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    },

    zoom: {
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
      },
    },
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;