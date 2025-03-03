import * as styled from "styled-components";

const GlobalStyle = styled.createGlobalStyle`
  /* Removido cursor: default e user-select: none do universal */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant-numeric: tabular-nums;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizeLegibility;
  }

  /* Para elementos “antes” e “depois” */
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* Ajustes de foco e outline */
  :focus {
    outline: 0; /* Se quiser remover, mas lembre da acessibilidade */
  }

  /* Corpo e HTML */
  html,
  body {
    font-family: ${({ theme }) => theme.formats.systemFont};
    font-size: 15px; /* Ajuste de tamanho de fonte */
    line-height: 1.5; /* Melhora legibilidade */
    background-color: ${({ theme }) => theme.colors.background};
    /* Transição suave de background quando trocar tema ou wallpaper */
    transition: background-color 0.5s ease;
  }

  body {
    height: 100%;
    overflow: hidden;
    position: fixed;
    text-size-adjust: none;
  }

  /* Altura total do HTML, com fallback para iOS/Firefox */
  html {
    /* stylelint-disable value-no-vendor-prefix */
    height: -webkit-fill-available;
    height: -moz-available;
    /* stylelint-enable value-no-vendor-prefix */

    &::before,
    &::after {
      background-blend-mode: var(--background-blend-mode);
      background-position: center;
      content: "";
      height: 100%;
      position: absolute;
      transition: opacity 1.25s ease-in-out;
      width: 100%;
      z-index: -1;
    }

    &::before {
      background: var(--before-background);
      opacity: var(--before-background-opacity);
    }

    &::after {
      background: var(--after-background);
      opacity: var(--after-background-opacity);
    }
  }

  /* Seleção de texto */
  ::selection {
    background-color: rgb(0, 120, 215);
    color: #fff;
  }

  /* Permite seleção de texto em inputs e textarea (útil em formulários) */
  input,
  textarea {
    user-select: text;
    cursor: text;
  }

  /* Em caso de querer proibir seleção em elementos específicos, faça:
     .no-select {
       user-select: none;
       cursor: default;
     }
   */

  /* Imagens em <picture> ocupam largura total sem espaçamento extra */
  picture > img {
    display: block;
  }

  /* Listas sem bullets */
  ol,
  ul {
    list-style: none;
  }
`;

export default GlobalStyle;
