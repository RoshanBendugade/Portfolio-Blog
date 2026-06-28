import profile from "../assets/profile.png";
import { FaGraduationCap, FaLaptopCode, FaCloud } from "react-icons/fa";

function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gray-100 dark:bg-[#111827] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-20">

          <p className="text-orange-500 uppercase tracking-widest">
            About Me
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Know More About Me
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div className="flex justify-center">

            <img
              src={profile}
              alt="Profile"
              className="w-96 rounded-3xl shadow-2xl"
            />

          </div>

          {/* Right */}

          <div>

            <h3 className="text-4xl font-bold">
              Java Full Stack Developer
            </h3>

            <p className="mt-6 text-gray-600 dark:text-gray-400 leading-8">

              I am currently pursuing B.Tech in Information Technology.

              I enjoy building scalable full-stack web applications
              using Java, Spring Boot, React and MySQL.

              My goal is to become a Cloud Computing Engineer and
              contribute to impactful software solutions.

            </p>

            <div className="grid sm:grid-cols-3 gap-6 mt-10">

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

                <FaGraduationCap className="text-3xl text-orange-500 mb-4" />

                <h4 className="font-bold">
                  Education
                </h4>

                <p className="text-gray-500 mt-2">
                  B.Tech IT
                </p>

              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

                <FaLaptopCode className="text-3xl text-orange-500 mb-4" />

                <h4 className="font-bold">
                  Experience
                </h4>

                <p className="text-gray-500 mt-2">
                  Full Stack Projects
                </p>

              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

                <FaCloud className="text-3xl text-orange-500 mb-4" />

                <h4 className="font-bold">
                  Goal
                </h4>

                <p className="text-gray-500 mt-2">
                  Cloud Engineer
                </p>

              </div>

            </div>

            <a
              href="/resume.pdf"
              className="inline-block mt-10 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl transition"
            >
              Download Resume
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;