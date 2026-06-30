import profile from "../../assets/images/profile.png";
import resume from "../../assets/resume/Roshan_Bendugade_Resume.pdf";

import { FaGraduationCap, FaLaptopCode, FaCloud } from "react-icons/fa";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Button from "../ui/Button";
import FadeIn from "../ui/FadeIn";

function About() {
  return (
    <section
      id="about"
      className="py-24 bg-gray-100 dark:bg-[#111827] transition-colors duration-300"
    >
      <Container>
        <SectionHeading
          subtitle="About Me"
          title="Know More About Me"
          description="I'm passionate about building modern, scalable web applications using Java, Spring Boot, React, and cloud technologies."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <FadeIn direction="left">
            <div className="flex justify-center">
              <img
                src={profile}
                alt="Profile"
                className="w-96 rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
              />
            </div>
          </FadeIn>

          {/* Right Side */}

          <FadeIn direction="right" delay={0.2}>
            <div>

              <h3 className="text-4xl font-bold dark:text-white">
                Java Full Stack Developer
              </h3>

              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-8">
                I am currently pursuing a B.Tech in Information Technology.
                I enjoy building scalable full-stack web applications using
                Java, Spring Boot, React, and MySQL.
              </p>

              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-8">
                My goal is to become a Cloud Computing Engineer while
                continuously improving my skills in backend development,
                frontend technologies, cloud platforms, and system design.
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mt-10">

                <Card className="text-center">
                  <FaGraduationCap className="text-4xl text-orange-500 mx-auto mb-4" />
                  <h4 className="font-bold text-lg dark:text-white">
                    Education
                  </h4>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    B.Tech IT
                  </p>
                </Card>

                <Card className="text-center">
                  <FaLaptopCode className="text-4xl text-orange-500 mx-auto mb-4" />
                  <h4 className="font-bold text-lg dark:text-white">
                    Experience
                  </h4>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Full Stack Projects
                  </p>
                </Card>

                <Card className="text-center">
                  <FaCloud className="text-4xl text-orange-500 mx-auto mb-4" />
                  <h4 className="font-bold text-lg dark:text-white">
                    Goal
                  </h4>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Cloud Engineer
                  </p>
                </Card>

              </div>

              <div className="mt-10">
                <a
                  href={resume}
                  download="Roshan_Bendugade_Resume.pdf"
                >
                  <Button>
                    Download Resume
                  </Button>
                </a>
              </div>

            </div>
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}

export default About;