import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import ParticlesBackground from "../ui/ParticlesBackground";

import HeroButtons from "./HeroButtons";
import HeroImage from "./HeroImage";
import HeroSocials from "./HeroSocials";
import HeroTechStack from "./HeroTechStack";
import HeroText from "./HeroText";

function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* Particle Background */}
      <ParticlesBackground />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}

          <FadeIn direction="left">
            <div>

              <HeroText />

              <HeroButtons />

              <HeroSocials />

              <HeroTechStack />

            </div>
          </FadeIn>

          {/* Right Side */}

          <FadeIn direction="right" delay={0.3}>
            <HeroImage />
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}

export default Hero;