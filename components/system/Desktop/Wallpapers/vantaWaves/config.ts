import { type VantaWavesConfig } from "components/system/Desktop/Wallpapers/vantaWaves/types";

export const config: VantaWavesConfig = {
  camera: {
    far: 500,
    fov: 35,
    near: 0.1,
  },
  color: "hsl(330, 60%, 40%)",
  colorCycleSpeed: 5,
  forceAnimate: true,
  hh: 80,
  hue: 330,
  lightness: 40,
  material: {
    options: {
      fog: true,
      wireframe: false,
    },
  },
  saturation: 60,
  shininess: 50,
  waveHeight: 30,
  waveSpeed: 0.5,
  ww: 80,
};

export const disableControls = {
  gyroControls: false,
  mouseControls: true,
  mouseEase: true,
  touchControls: true,
};
