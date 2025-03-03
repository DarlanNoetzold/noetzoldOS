// components/system/Desktop/Wallpapers/vantaWaves/index.ts

import { type WallpaperConfig } from "components/system/Desktop/Wallpapers/types";
import { disableControls } from "components/system/Desktop/Wallpapers/vantaWaves/config";
import { type VantaWavesConfig } from "components/system/Desktop/Wallpapers/vantaWaves/types";
import { loadFiles } from "utils/functions";

export const libs = [
  "/System/Vanta.js/three.min.js",
  "/System/Vanta.js/vanta.waves.min.js",
];

const vantaWaves = (
  el: HTMLElement | null,
  config?: WallpaperConfig,
  fallback?: () => void
): void => {
  const { VANTA: { current: currentEffect } = {} } = window;

  try {
    currentEffect?.destroy();
  } catch {
    // Falhou ao limpar efeito anterior
  }

  if (!el || typeof WebGLRenderingContext === "undefined") return;

  loadFiles(libs, true).then(() => {
    const { VANTA: { WAVES } = {} } = window;

    if (WAVES) {
      try {
        WAVES({
          el,
          ...disableControls,
          ...(config as VantaWavesConfig),
        });

        // Ajusta container
        const container = el;
        container.style.position = "relative";

        // Texto grande ao centro
        const textMask = document.createElement("div");
        textMask.textContent = "noetzold.tech".toUpperCase();

        Object.assign(textMask.style, {
          color: "#ffffff",
          fontSize: "15vw",
          fontWeight: "900",
          left: "50%",
          letterSpacing: "0.2em",
          mixBlendMode: "difference",
          pointerEvents: "none",
          position: "absolute",
          textAlign: "center",
          top: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          zIndex: "9999",
        });

        container.append(textMask);
      } catch {
        fallback?.();
      }
    }
  });
};

export default vantaWaves;
