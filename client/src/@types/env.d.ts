
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare module '*.json'

interface ImportMetaEnv {
  /**
   * 应用标题
   */
  VITE_APP_TITLE: string;
  /**
   * 应用端口
   */
  VITE_APP_PORT: number;
  /**
   * API基础路径(反向代理)
   */
  VITE_APP_BASE_API: string;

  VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


