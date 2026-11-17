
import { TypeAnimation } from "react-type-animation";

function HeroText() {
  return (
    <div>

      {/* Welcome Badge */}

      <div className="inline-flex items-center gap-2
        px-4 py-2 rounded-full
        bg-teal-50 dark:bg-teal-950
        text-teal-800 dark:text-teal-300
        text-sm font-semibold mb-6">

        <span className="w-2 h-2 rounded-full bg-teal-500"></span>

        Welcome to my portfolio

      </div>

      {/* Introduction */}

      <p className="text-gray-500 dark:text-gray-400
        font-medium text-base mb-3">
        Hello, I'm
      </p>

      {/* Name */}

      <h1 className="text-4xl sm:text-5xl xl:text-6xl
        font-extrabold tracking-tight leading-tight">

        Roshan
        <br />

        <span className="text-[#087f70]">
          Bendugade.
        </span>

      </h1>

      {/* Animated Designation */}

      <div className="mt-6 text-xl sm:text-2xl
        font-semibold text-gray-700 dark:text-gray-200
        min-h-[40px]">

        <TypeAnimation
          sequence={[
            "Java Full Stack Developer",
            2000,
            "Spring Boot Developer",
            2000,
            "React Developer",
            2000,
            "Cloud Computing Enthusiast",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />

      </div>

      {/* Description */}

      <p className="mt-6 text-gray-600 dark:text-gray-400
        text-base sm:text-lg leading-8 max-w-xl">

        I build scalable web applications using Java,
        Spring Boot, React and MySQL. I enjoy solving
        problems, creating useful products and exploring
        cloud technologies.

      </p>

    </div>
  );
}

export default HeroText;
