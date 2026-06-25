import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import profile from "../assets/profile.jpg";

function Home() {
  return (
    <>
      {/* Hero Section */}

      <section className="min-h-screen bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white flex flex-col justify-center items-center px-6">

        <img
          src={profile}
          alt="Roshan"
          className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-2xl mb-6"
        />

        <h1 className="text-6xl font-bold text-center">
          Hi, I'm Roshan 👋
        </h1>

        <p className="text-2xl mt-4 text-center">
          Java Full Stack Developer
        </p>

        <p className="mt-2 text-gray-300 text-center">
          React • Spring Boot • MySQL
        </p>

        <div className="flex gap-4 mt-8">

          <Link to="/projects">
            <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
              View Projects
            </button>
          </Link>

          <Link to="/contact">
            <button className="bg-white text-black px-6 py-3 rounded-lg">
              Contact Me
            </button>
          </Link>

        </div>

        {/* Social Icons */}

        <div className="flex gap-6 mt-10 text-3xl">

          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/YOUR_PROFILE"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:your@email.com">
            <FaEnvelope />
          </a>

        </div>

      </section>

      {/* About Section */}

      <section className="bg-slate-100 py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-6">
            About Me
          </h2>

          <p className="text-lg text-gray-700">
            I am an IT student passionate about
            Java Full Stack Development,
            Spring Boot, React, MySQL,
            REST APIs and Cloud Computing.
          </p>

        </div>

      </section>

      {/* Stats Section */}

      <section className="py-20 bg-white">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-10 text-center">
            Portfolio Stats
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-5xl font-bold">
                5+
              </h3>
              <p className="mt-2">
                Projects
              </p>
            </div>

            <div className="bg-green-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-5xl font-bold">
                10+
              </h3>
              <p className="mt-2">
                Blogs
              </p>
            </div>

            <div className="bg-purple-600 text-white p-8 rounded-xl text-center">
              <h3 className="text-5xl font-bold">
                8+
              </h3>
              <p className="mt-2">
                Technologies
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Skills */}

      <section className="bg-slate-100 py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h2 className="text-4xl font-bold mb-8">
            Skills
          </h2>

          <div className="flex flex-wrap gap-4">

            {[
              "Java",
              "Spring Boot",
              "React",
              "MySQL",
              "Hibernate",
              "REST API",
              "Git",
              "GitHub",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-slate-800 text-white px-5 py-3 rounded-xl"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;