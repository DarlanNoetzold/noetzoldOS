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

  // Tenta destruir efeito anterior (se existir)
  try {
    currentEffect?.destroy();
  } catch {
    // Falhou ao limpar efeito anterior
  }

  if (!el || typeof WebGLRenderingContext === "undefined") return;

  // Carrega libs (Three + VantaWaves)
  loadFiles(libs, true).then(() => {
    const { VANTA: { WAVES } = {} } = window;

    if (WAVES) {
      try {
        // Inicializa Vanta Waves
        WAVES({
          el,
          ...disableControls,
          ...(config as VantaWavesConfig),
        });

        // Ajusta container
        const container = el;
        container.style.position = "relative";

        // Cria watermark "noetzold.tech"
        const watermark = document.createElement("div");
        watermark.textContent = "noetzold.tech";

        // Define estilo (agora com zIndex alto)
        Object.assign(watermark.style, {
          bottom: "10px",
          color: "#ffffff",
          fontSize: "0.875rem",
          fontWeight: "bold",
          opacity: "0.8",
          pointerEvents: "none",
          position: "absolute",
          right: "10px",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.6)",
          zIndex: "9999",
        });

        container.append(watermark);
      } catch {
        fallback?.();
      }
    }
  });
};

export default vantaWaves;
