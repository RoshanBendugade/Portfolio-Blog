import { FaGraduationCap, FaLaptopCode, FaCloud } from "react-icons/fa6";

import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";

const highlights = [
  {
    icon: FaGraduationCap,
    label: "Education",
    title: "B.Tech in Information Technology",
    text: "Building a strong foundation in software development, computer science and emerging technologies.",
  },
  {
    icon: FaLaptopCode,
    label: "What I build",
    title: "Full stack web applications",
    text: "Complete products using React, Java, Spring Boot and MySQL, from the database to the interface.",
  },
  {
    icon: FaCloud,
    label: "Where I'm heading",
    title: "Cloud engineering",
    text: "Learning backend development, cloud technologies and system design, with Docker and Kubernetes on the list.",
  },
];

function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:gap-14">

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="About" title="Hi, I'm Roshan." />

            <div className="-mt-4 space-y-4 leading-8 text-muted">
              <p>
                I am pursuing a B.Tech in Information Technology and enjoy
                building scalable full-stack web applications.
              </p>
              <p>
                I work with Java, Spring Boot, React and MySQL, and enjoy
                solving problems through technology.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <FadeIn>
            <div className="bento divided h-full overflow-hidden">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="flex gap-4 p-6 sm:p-7">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--soft)] text-accent">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-sm text-muted">{item.label}</p>
                      <h3 className="mt-0.5 text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-2 leading-7 text-muted">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}

export default About;