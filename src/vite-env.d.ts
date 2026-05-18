/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AD_ENV?: 'test' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
