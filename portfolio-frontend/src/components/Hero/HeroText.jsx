import { TypeAnimation } from "react-type-animation";

function HeroText() {
  return (
    <>
      <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold">
        Welcome to my Portfolio
      </p>

      <h1 className="mt-5 text-5xl md:text-7xl font-extrabold leading-tight">
        Hi, I'm
        <br />
        <span className="text-orange-500">
          Roshan Bendugade
        </span>
      </h1>

      <div className="mt-6 text-2xl md:text-4xl font-semibold h-14">
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
          className="text-orange-400"
        />
      </div>

      <p className="mt-8 text-lg text-gray-300 leading-8 max-w-xl">
        Passionate about building scalable web applications using Java,
        Spring Boot, React, and MySQL while continuously learning cloud
        technologies and modern software development practices.
      </p>
    </>
  );
}

export default HeroText;