import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

function ParticleBg() {
  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);

  return (
    <div>
      <Particles options={particlesOptions} init={particlesInit} />
    </div>
  );
}

export default ParticleBg;
