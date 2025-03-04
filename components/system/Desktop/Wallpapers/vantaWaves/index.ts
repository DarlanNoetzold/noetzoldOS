// components/system/Desktop/Wallpapers/vantaWaves/index.ts

import { loadFiles } from "utils/functions";

export const libs: string[] = [];

const SingleImageWallpaper = async (el?: HTMLElement | null): Promise<void> => {
  if (!el) return;

  try {
    // Se houver um efeito Vanta antigo, destrói (opcional)
    window?.VANTA?.current?.destroy?.();

    // 1. Carrega libs (se tiver, aqui está vazio).
    await loadFiles(libs);

    // 2. Cria um novo <div> para ser o "fundo".
    const wallpaperDiv = document.createElement("div");

    // 3. Define estilo no <div> (NÃO mexemos em el.style, fugindo do no-param-reassign).
    Object.assign(wallpaperDiv.style, {
      background:
        'url("https://cdn.wallpaperhub.app/cloudcache/b/d/7/6/4/b/bd764bb25d49a05105060185774ba14cd2c846f7.jpg") no-repeat center center / cover',
      height: "100%",
      left: "0",
      position: "fixed",
      top: "0",
      width: "100%",
      zIndex: "-1",
    });

    // 4. Anexa o <div> dentro de el.
    el.append(wallpaperDiv);
  } catch {
    // Se quiser, chame fallback aqui, caso algo dê errado
  }
};

export default SingleImageWallpaper;
