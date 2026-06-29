import profile from "../assets/profile.png";

import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-[#0B1120] transition-colors duration-300"
    >
      {/* Background Glow */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/20 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-8 w-full">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <p className="text-orange-500 font-semibold mb-4 tracking-widest uppercase">
              Welcome to my portfolio
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">

              Hi, I'm

              <br />

              <span className="text-orange-500">
                Roshan Bendugade
              </span>

            </h1>

            <h2 className="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-300">

              Java Full Stack Developer

            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 max-w-xl">

              I build modern, scalable and responsive web
              applications using Java, Spring Boot, React,
              MySQL and REST APIs.

              I enjoy learning new technologies and solving
              real-world problems through software.

            </p>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="#projects"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-xl transition"
              >
                View Projects
                <FaArrowRight />
              </a>

              <a
                href="/resume.pdf"
                className="border border-gray-400 dark:border-gray-600 px-7 py-4 rounded-xl hover:border-orange-500 transition"
              >
                Download Resume
              </a>

            </div>

            {/* Social */}

            <div className="flex gap-6 mt-10 text-2xl">

              <a
                href="https://github.com/YOUR_USERNAME"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-500 transition"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <div className="relative">

              <div className="absolute inset-0 bg-orange-500 rounded-full blur-[120px] opacity-20"></div>

              <img
                src={profile}
                alt="Profile"
                className="relative w-80 md:w-96 rounded-3xl border-4 border-slate-700 shadow-2xl"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;