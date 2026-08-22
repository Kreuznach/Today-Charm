/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REWARD_AD_ID?: string;
  readonly VITE_BANNER_AD_ID?: string;
  readonly VITE_NOTIFY_TEMPLATE_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
