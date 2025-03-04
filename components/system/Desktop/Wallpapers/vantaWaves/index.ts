import { loadFiles } from "utils/functions";
import { disableControls } from "components/system/Desktop/Wallpapers/vantaWaves/config";
import { type WallpaperConfig, } from "components/system/Desktop/Wallpapers/types";
import { type VantaWavesConfig } from "components/system/Desktop/Wallpapers/vantaWaves/types";


export const libs = [
  "/System/Vanta.js/three.min.js",
  "/System/Vanta.js/vanta.waves.min.js",
];

const injectStyles = (): void => {
  const style = document.createElement("style");
  style.textContent = `
    .vanta-container {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      isolation: isolate; /* Novo: Cria novo contexto de empilhamento */
    }

    .vanta-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: rgba(255, 255, 255, 0.9);
      font-family: Arial, sans-serif;
      font-size: clamp(2rem, 5vw, 4rem);
      pointer-events: none;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      z-index: 2; /* Aumentado para garantir sobreposição */
      user-select: none;
      mix-blend-mode: screen; /* Melhora visibilidade em fundos escuros */
    }

    /* Garante que o canvas fique atrás do texto */
    .vanta-container > canvas {
      position: absolute;
      z-index: 1;
      inset: 0;
    }
  `;
  document.head.append(style);
};

const vantaWaves = (
  el: HTMLElement | null,
  config?: WallpaperConfig,
  fallback?: () => void
): void => {
  const { VANTA: { current: currentEffect } = {} } = window;

  try {
    currentEffect?.destroy();
  } catch {
    // Cleanup error handling
  }

  if (!el || typeof WebGLRenderingContext === "undefined") return;

  injectStyles();

  const container = document.createElement("div");
  container.className = "vanta-container";
  
  const textElement = document.createElement("div");
  textElement.className = "vanta-text";
  textElement.textContent = "noetzold.tech";
  
  if (el.parentNode) {
    // Remove qualquer classe existente no elemento canvas
    el.className = '';
    
    // Cria estrutura correta
    const wrapper = document.createElement('div');
    wrapper.className = 'vanta-container';
    
    // Insere na ordem correta: wrapper -> canvas -> text
    el.parentNode.insertBefore(wrapper, el);
    wrapper.append(el, textElement);
  }

  loadFiles(libs, true).then(() => {
    const { VANTA: { WAVES } = {} } = window;

    if (WAVES) {
      try {
        WAVES({
          el,
          ...disableControls,
          ...(config as VantaWavesConfig),
        });
      } catch {
        fallback?.();
      }
    }
  });
};

export default vantaWaves;