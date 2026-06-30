import { motion } from "framer-motion";

import profile from "../../assets/images/profile.png";

function HeroImage() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
      }}
      className="relative"
    >
      <div className="absolute inset-0 rounded-full bg-orange-500 blur-[120px] opacity-20"></div>

      <img
        src={profile}
        alt="Roshan"
        className="relative w-[420px] rounded-3xl shadow-2xl border border-slate-700"
      />
    </motion.div>
  );
}

export default HeroImage;