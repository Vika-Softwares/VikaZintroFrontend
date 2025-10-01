/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // adicione outras variáveis aqui...
  // readonly VITE_OUTRA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
