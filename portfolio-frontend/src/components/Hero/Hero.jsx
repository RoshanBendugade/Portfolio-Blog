import { TypeAnimation } from "react-type-animation";
import { FaArrowRight, FaDownload } from "react-icons/fa6";

import FadeIn from "../ui/FadeIn";
import skills from "../../constants/skills";
import socialLinks from "../../constants/socialLinks";
import profile from "../../assets/images/profile.png";
import resume from "../../assets/resume/Roshan_Bendugade_Resume.pdf";

function Hero() {
  return (
    <section id="home" className="px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-12">

        {/* Intro */}
        <FadeIn className="lg:col-span-7">
          <div className="bento flex h-full flex-col justify-center p-7 sm:p-10">
            <span className="chip w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Open to opportunities
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Roshan
              <br />
              <span className="text-accent">Bendugade.</span>
            </h1>

            <div className="mt-4 min-h-[32px] text-lg font-semibold sm:text-xl">
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

            <p className="mt-5 max-w-xl leading-7 text-muted">
              I build scalable web applications using Java, Spring Boot, React
              and MySQL. I enjoy solving problems, creating useful products and
              exploring cloud technologies.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View projects
                <FaArrowRight size={13} />
              </a>

              <a
                href={resume}
                download="Roshan_Bendugade_Resume.pdf"
                className="btn btn-ghost"
              >
                <FaDownload size={13} />
                Resume
              </a>

              <div className="ml-1 flex items-center gap-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      title={item.name}
                      className="icon-btn"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Photo */}
        <FadeIn delay={0.1} className="lg:col-span-5">
          <div className="bento relative h-full min-h-[340px] overflow-hidden">
            <img
              src={profile}
              alt="Roshan Bendugade"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        </FadeIn>

        {/* Stack */}
        <FadeIn delay={0.15} className="lg:col-span-8">
          <div className="bento-soft h-full p-6 sm:p-7">
            <p className="text-sm font-semibold text-accent">Main stack</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <span key={skill.name} className="chip">
                    <Icon className="text-accent" />
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2} className="lg:col-span-4">
          <a
            href="#contact"
            className="bento-fill group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-[var(--fill-hover)] sm:p-7"
          >
            <p className="text-sm text-white/80">
              Have a role or project in mind?
            </p>

            <p className="flex items-center gap-2 text-2xl font-bold">
              Let&rsquo;s connect
              <FaArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </p>
          </a>
        </FadeIn>

      </div>
    </section>
  );
}

export default Hero;