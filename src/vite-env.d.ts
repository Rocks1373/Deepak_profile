/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GODAM_API_BASE?: string
  readonly VITE_GODAM_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
