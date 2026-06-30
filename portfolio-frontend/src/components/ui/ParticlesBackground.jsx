import { useMemo } from "react";
import Particles from "@tsparticles/react";

function ParticlesBackground() {
  const options = useMemo(
    () => ({
      fullScreen: false,

      background: {
        color: {
          value: "transparent",
        },
      },

      fpsLimit: 60,

      particles: {
        number: {
          value: 60,
        },

        color: {
          value: "#f97316",
        },

        links: {
          enable: true,
          color: "#f97316",
          distance: 150,
          opacity: 0.2,
        },

        move: {
          enable: true,
          speed: 1,
        },

        opacity: {
          value: 0.4,
        },

        size: {
          value: {
            min: 2,
            max: 5,
          },
        },
      },

      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="particles"
      options={options}
      className="absolute inset-0 -z-10"
    />
  );
}

export default ParticlesBackground;