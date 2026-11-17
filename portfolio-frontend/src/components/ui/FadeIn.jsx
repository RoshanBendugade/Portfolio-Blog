import { motion } from "framer-motion";

const offsets = {
  up: { y: 24 },
  left: { x: -24 },
  right: { x: 24 },
  zoom: { scale: 0.96 },
};

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className = "",
}) {
  return (
    <motion.div
      className={`h-full ${className}`}
      initial={{ opacity: 0, ...(offsets[direction] ?? offsets.up) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;