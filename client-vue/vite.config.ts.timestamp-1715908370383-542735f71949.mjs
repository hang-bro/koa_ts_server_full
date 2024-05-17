// vite.config.ts
import { resolve } from "path";
import { defineConfig, loadEnv, searchForWorkspaceRoot } from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.8_@types+node@20.2.3_sass@1.62.1/node_modules/vite/dist/node/index.js";

// vite/usePlugin.ts
import vue from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.2.3_vite@4.4.8_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue-jsx@3.0.1_vite@4.4.8_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.16.2_@vueuse+core@10.3.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import setupExtend from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-setup-extend@0.4.0_vite@4.4.8/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import { ElementPlusResolver } from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.24.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { visualizer } from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+rollup-plugin-visualizer@5.9.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createSvgIconsPlugin } from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-svg-icons@2.0.1_vite@4.4.8/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import viteCompression from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-compression@0.5.1_vite@4.4.8/node_modules/vite-plugin-compression/dist/index.mjs";

// vite/usePath.ts
import path from "path";
var __vite_injected_original_dirname = "D:\\my-gitee\\koa_ts_server_full\\client-vue\\vite";
var BUILD_PATH = path.join(__vite_injected_original_dirname, "../../nginx-1.22.0/html");
var SVG_PATH = path.join(__vite_injected_original_dirname, "../src/assets/svg");
var TYPES_PATH = path.join(__vite_injected_original_dirname, "../src/@types");

// vite/usePlugin.ts
import { createStyleImportPlugin, ElementPlusResolve } from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-style-import@2.0.0_vite@4.4.8/node_modules/vite-plugin-style-import/dist/index.mjs";
import { prismjsPlugin } from "file:///D:/my-gitee/koa_ts_server_full/client-vue/node_modules/.pnpm/vite-plugin-prismjs@0.0.11_prismjs@1.29.0/node_modules/vite-plugin-prismjs/dist/index.js";
var usePlugin_default = (isProduction) => {
  return [
    vue(),
    setupExtend(),
    vueJsx(),
    prismjsPlugin({
      languages: "all",
      // 语言
      plugins: ["line-numbers", "copy-to-clipboard"],
      //官网有其他功能,这里开启行数和复制按钮功能
      theme: "coy",
      // 主题
      css: true
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [SVG_PATH],
      // Specify symbolId format
      symbolId: "icon-[dir]-[name]"
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()]
    }),
    // brotli 压缩
    viteCompression({
      disable: true,
      //是否禁用
      threshold: 10240,
      algorithm: "brotliCompress",
      ext: ".br"
    }),
    // gzip压缩
    viteCompression({
      disable: true,
      //是否禁用
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz"
    }),
    // 自动引入
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      // 自动导入vue和vue-router相关函数
      dts: `${TYPES_PATH}/auto-import.d.ts`,
      // 生成 `auto-import.d.ts` 全局声明
      resolvers: [ElementPlusResolver()]
    }),
    // 自动引入element-plus组件
    Components({
      resolvers: [ElementPlusResolver()],
      dts: `${TYPES_PATH}/components.d.ts`
      // 生成 `auto-import.d.ts` 全局声明
    }),
    // 支持老旧版本
    // legacyPlugin({
    //   targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    // })
    visualizer({ open: true })
  ];
};

// vite.config.ts
var __vite_injected_original_dirname2 = "D:\\my-gitee\\koa_ts_server_full\\client-vue";
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd());
  console.log({
    mode,
    command
  });
  const isProduction = mode === "production";
  return {
    // 生产或开发环境下的基础路径
    // base: '/doc',
    // 需要用到的插件数组
    plugins: usePlugin_default(isProduction),
    server: {
      // proxy: {
      //   /** '/api' */
      //   [env.VITE_BASE_API]: {
      //     target: env.VITE_BASE_URL + env.VITE_BASE_API /**http://192.168.5.240:2335 */,
      //     changeOrigin: true,
      //     rewrite: (path) => {
      //       console.log(`path ==>`,JSON.parse(JSON.stringify(path)));
      //       return path.replace(/^\/api/, '')
      //     },
      //   },
      // },
      // https: {
      //   cert: fs.readFileSync(path.join(__dirname, './keys/cert.crt')),
      //   key: fs.readFileSync(path.join(__dirname, './keys/cert.key')),
      // },
      host: true,
      port: env.VITE_FRONT_PORT,
      /**可读取的文件夹 */
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd()), "../app/enum"]
      }
    },
    //
    resolve: {
      // 设置文件目录别名
      alias: {
        "@": resolve(__vite_injected_original_dirname2, "./src"),
        "~": resolve(__vite_injected_original_dirname2, "./"),
        "@@": resolve(__vite_injected_original_dirname2, "../server")
      },
      extensions: [".js", ".ts", ".tsx", ".jsx"]
      //
    },
    build: {
      // outDir: path.join(__dirname, '../docBuild/koa_ts_server_full_doc'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name]-[hash].js",
          // 引入文件名的名称
          entryFileNames: "js/[name]-[hash].js",
          // 包的入口文件名称
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          // 资源文件像 字体，图片等
          /**
           * @description  清除文件名格式不正确问题
           * @param name
           * @returns
           */
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          sanitizeFileName(name) {
            const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
            const DRIVE_LETTER_REGEX = /^[a-z]:/i;
            const match = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter = match ? match[0] : "";
            let file = driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
            if (file.startsWith("_"))
              file = file.slice(1);
            return file;
          }
          // // 最小化拆分包
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // },
        }
      }
    },
    esbuild: {
      // drop: isProduction ? ['console', 'debugger'] : [], // 删除 所有的console 和 debugger
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS91c2VQbHVnaW4udHMiLCAidml0ZS91c2VQYXRoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXktZ2l0ZWVcXFxca29hX3RzX3NlcnZlcl9mdWxsXFxcXGNsaWVudC12dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LWdpdGVlXFxcXGtvYV90c19zZXJ2ZXJfZnVsbFxcXFxjbGllbnQtdnVlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1naXRlZS9rb2FfdHNfc2VydmVyX2Z1bGwvY2xpZW50LXZ1ZS92aXRlLmNvbmZpZy50c1wiOy8qXHJcbiAqIEBEZXNjcmlwdGlvbjpcclxuICogQEF1dGhvcjogSFlIXHJcbiAqIEBMYXN0RWRpdG9yczogSFlIXHJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjMtMDctMjggMjA6MDg6NDVcclxuICovXHJcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgc2VhcmNoRm9yV29ya3NwYWNlUm9vdCB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB1c2VQbHVnaW4gZnJvbSAnLi92aXRlL3VzZVBsdWdpbidcclxuXHJcbi8vIEB0cy1pZ25vcmVcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUsIHNzckJ1aWxkIH0pID0+IHtcclxuICAvKipcdTY4MzlcdTYzNkUgXCJtb2RlXCIgXHU1MDNDIFx1OEJGQlx1NTNENlx1ODNCN1x1NTNENlx1NjcyQ1x1NTczMFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NEUyRFx1NzY4NC5lbnYuW21vZGVdXHU0RTJEIFZJVEVfQkFTRV9VUkwgXHU3Njg0XHU1MDNDICovXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIGNvbnNvbGUubG9nKHtcclxuICAgIG1vZGUsXHJcbiAgICBjb21tYW5kLFxyXG4gIH0pXHJcbiAgY29uc3QgaXNQcm9kdWN0aW9uID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAvLyBcdTc1MUZcdTRFQTdcdTYyMTZcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMEJcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcclxuICAgIC8vIGJhc2U6ICcvZG9jJyxcclxuICAgIC8vIFx1OTcwMFx1ODk4MVx1NzUyOFx1NTIzMFx1NzY4NFx1NjNEMlx1NEVGNlx1NjU3MFx1N0VDNFxyXG4gICAgcGx1Z2luczogdXNlUGx1Z2luKGlzUHJvZHVjdGlvbiksXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgLy8gcHJveHk6IHtcclxuICAgICAgLy8gICAvKiogJy9hcGknICovXHJcbiAgICAgIC8vICAgW2Vudi5WSVRFX0JBU0VfQVBJXToge1xyXG4gICAgICAvLyAgICAgdGFyZ2V0OiBlbnYuVklURV9CQVNFX1VSTCArIGVudi5WSVRFX0JBU0VfQVBJIC8qKmh0dHA6Ly8xOTIuMTY4LjUuMjQwOjIzMzUgKi8sXHJcbiAgICAgIC8vICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4ge1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmxvZyhgcGF0aCA9PT5gLEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGF0aCkpKTtcclxuICAgICAgLy8gICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICAvLyAgICAgfSxcclxuICAgICAgLy8gICB9LFxyXG4gICAgICAvLyB9LFxyXG4gICAgICAvLyBodHRwczoge1xyXG4gICAgICAvLyAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9rZXlzL2NlcnQuY3J0JykpLFxyXG4gICAgICAvLyAgIGtleTogZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihfX2Rpcm5hbWUsICcuL2tleXMvY2VydC5rZXknKSksXHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIHBvcnQ6IGVudi5WSVRFX0ZST05UX1BPUlQsXHJcbiAgICAgIC8qKlx1NTNFRlx1OEJGQlx1NTNENlx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOSAqL1xyXG4gICAgICBmczoge1xyXG4gICAgICAgIGFsbG93OiBbc2VhcmNoRm9yV29ya3NwYWNlUm9vdChwcm9jZXNzLmN3ZCgpKSwgJy4uL2FwcC9lbnVtJ10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIC8vXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1NjU4N1x1NEVGNlx1NzZFRVx1NUY1NVx1NTIyQlx1NTQwRFxyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAgICd+JzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLFxyXG4gICAgICAgICdAQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vc2VydmVyJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy50cycsICcudHN4JywgJy5qc3gnXSxcclxuICAgICAgLy9cclxuICAgIH0sXHJcbiAgICBidWlsZDoge1xyXG4gICAgICAvLyBvdXREaXI6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9kb2NCdWlsZC9rb2FfdHNfc2VydmVyX2Z1bGxfZG9jJyksXHJcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTVGMTVcdTUxNjVcdTY1ODdcdTRFRjZcdTU0MERcdTc2ODRcdTU0MERcdTc5RjBcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnanMvW25hbWVdLVtoYXNoXS5qcycsIC8vIFx1NTMwNVx1NzY4NFx1NTE2NVx1NTNFM1x1NjU4N1x1NEVGNlx1NTQwRFx1NzlGMFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJywgLy8gXHU4RDQ0XHU2RTkwXHU2NTg3XHU0RUY2XHU1MENGIFx1NUI1N1x1NEY1M1x1RkYwQ1x1NTZGRVx1NzI0N1x1N0I0OVxyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBAZGVzY3JpcHRpb24gIFx1NkUwNVx1OTY2NFx1NjU4N1x1NEVGNlx1NTQwRFx1NjgzQ1x1NUYwRlx1NEUwRFx1NkI2M1x1Nzg2RVx1OTVFRVx1OTg5OFxyXG4gICAgICAgICAgICogQHBhcmFtIG5hbWVcclxuICAgICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICAgKi9cclxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwL2Jsb2IvbWFzdGVyL3NyYy91dGlscy9zYW5pdGl6ZUZpbGVOYW1lLnRzXHJcbiAgICAgICAgICBzYW5pdGl6ZUZpbGVOYW1lKG5hbWUpIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcclxuICAgICAgICAgICAgY29uc3QgSU5WQUxJRF9DSEFSX1JFR0VYID0gL1tcXHUwMDAwLVxcdTAwMUZcIiMkJiorLDo7PD0+P1tcXF1eYHt8fVxcdTAwN0ZdL2dcclxuICAgICAgICAgICAgY29uc3QgRFJJVkVfTEVUVEVSX1JFR0VYID0gL15bYS16XTovaVxyXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IERSSVZFX0xFVFRFUl9SRUdFWC5leGVjKG5hbWUpXHJcbiAgICAgICAgICAgIGNvbnN0IGRyaXZlTGV0dGVyID0gbWF0Y2ggPyBtYXRjaFswXSA6ICcnXHJcbiAgICAgICAgICAgIC8vIEEgYDpgIGlzIG9ubHkgYWxsb3dlZCBhcyBwYXJ0IG9mIGEgd2luZG93cyBkcml2ZSBsZXR0ZXIgKGV4OiBDOlxcZm9vKVxyXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIGF2b2lkIHRoZW0gYmVjYXVzZSB0aGV5IGNhbiByZWZlciB0byBOVEZTIGFsdGVybmF0ZSBkYXRhIHN0cmVhbXMuXHJcbiAgICAgICAgICAgIGxldCBmaWxlID0gZHJpdmVMZXR0ZXIgKyBuYW1lLnNsaWNlKGRyaXZlTGV0dGVyLmxlbmd0aCkucmVwbGFjZShJTlZBTElEX0NIQVJfUkVHRVgsICcnKVxyXG4gICAgICAgICAgICBpZiAoZmlsZS5zdGFydHNXaXRoKCdfJykpIGZpbGUgPSBmaWxlLnNsaWNlKDEpIC8qKlx1NTNCQlx1OTY2NFx1OTk5Nlx1NEY0RFx1NUI1N1x1N0IyNlx1NEUzMlx1NEUzQSBcIl9cIiAsIGZpeCBnaXRodWIgcGFnZVx1OEJCRlx1OTVFRVx1NEUwRFx1NEU4Nlx1NzY4NFx1OTVFRVx1OTg5OCovXHJcbiAgICAgICAgICAgIHJldHVybiBmaWxlXHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgIC8vIC8vIFx1NjcwMFx1NUMwRlx1NTMxNlx1NjJDNlx1NTIwNlx1NTMwNVxyXG4gICAgICAgICAgLy8gbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICAvLyAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgIC8vICAgICByZXR1cm4gaWQudG9TdHJpbmcoKS5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdLnNwbGl0KCcvJylbMF0udG9TdHJpbmcoKVxyXG4gICAgICAgICAgLy8gICB9XHJcbiAgICAgICAgICAvLyB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICAvLyBkcm9wOiBpc1Byb2R1Y3Rpb24gPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLCAvLyBcdTUyMjBcdTk2NjQgXHU2MjQwXHU2NzA5XHU3Njg0Y29uc29sZSBcdTU0OEMgZGVidWdnZXJcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15LWdpdGVlXFxcXGtvYV90c19zZXJ2ZXJfZnVsbFxcXFxjbGllbnQtdnVlXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LWdpdGVlXFxcXGtvYV90c19zZXJ2ZXJfZnVsbFxcXFxjbGllbnQtdnVlXFxcXHZpdGVcXFxcdXNlUGx1Z2luLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1naXRlZS9rb2FfdHNfc2VydmVyX2Z1bGwvY2xpZW50LXZ1ZS92aXRlL3VzZVBsdWdpbi50c1wiOy8qXHJcbiAqIEBEZXNjcmlwdGlvbjp2aXRlXHU2M0QyXHU0RUY2XHJcbiAqIEBBdXRob3I6IEhZSFxyXG4gKiBATGFzdEVkaXRvcnM6IEhZSFxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIzLTAyLTA4IDEwOjE4OjU5XHJcbiAqL1xyXG4vKipcclxuICogXHU2ODM5XHU2MzZFXHU5ODc5XHU3NkVFXHU2MjQwXHU3NTI4XHU2ODQ2XHU2N0I2IFx1NUI4OVx1ODhDNVx1NjNEMlx1NEVGNlx1RkYwQ1x1NUU3Nlx1NkNFOFx1NTE4Q1x1NTIzMCBwbHVnaW5cdTkxQ0NcdTk3NjJcdTUzQkJcclxuICovXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCBzZXR1cEV4dGVuZCBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG4vLyBcdTY3RTVcdTc3MEJcdTYyNTNcdTUzMDVcdThCRTZcdTYwQzVcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcidcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbi8qKlxyXG4gKiBcdTUzOEJcdTdGMjkgZ3ppcFxyXG4gKi9cclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcclxuaW1wb3J0IHsgU1ZHX1BBVEgsIFRZUEVTX1BBVEggfSBmcm9tICcuL3VzZVBhdGgnXHJcbmltcG9ydCB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IGNyZWF0ZVN0eWxlSW1wb3J0UGx1Z2luLCBFbGVtZW50UGx1c1Jlc29sdmUgfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnXHJcblxyXG5pbXBvcnQgeyBwcmlzbWpzUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tcHJpc21qcydcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoaXNQcm9kdWN0aW9uPzogYm9vbGVhbik6IFBsdWdpbk9wdGlvbltdID0+IHtcclxuICByZXR1cm4gW1xyXG4gICAgdnVlKCksXHJcbiAgICBzZXR1cEV4dGVuZCgpLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICBwcmlzbWpzUGx1Z2luKHtcclxuICAgICAgbGFuZ3VhZ2VzOiAnYWxsJywgLy8gXHU4QkVEXHU4QTAwXHJcbiAgICAgIHBsdWdpbnM6IFsnbGluZS1udW1iZXJzJywgJ2NvcHktdG8tY2xpcGJvYXJkJ10sIC8vXHU1Qjk4XHU3RjUxXHU2NzA5XHU1MTc2XHU0RUQ2XHU1MjlGXHU4MEZELFx1OEZEOVx1OTFDQ1x1NUYwMFx1NTQyRlx1ODg0Q1x1NjU3MFx1NTQ4Q1x1NTkwRFx1NTIzNlx1NjMwOVx1OTRBRVx1NTI5Rlx1ODBGRFxyXG4gICAgICB0aGVtZTogJ2NveScsIC8vIFx1NEUzQlx1OTg5OFxyXG4gICAgICBjc3M6IHRydWUsXHJcbiAgICB9KSxcclxuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgLy8gU3BlY2lmeSB0aGUgaWNvbiBmb2xkZXIgdG8gYmUgY2FjaGVkXHJcbiAgICAgIGljb25EaXJzOiBbU1ZHX1BBVEhdLFxyXG4gICAgICAvLyBTcGVjaWZ5IHN5bWJvbElkIGZvcm1hdFxyXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJyxcclxuICAgIH0pLFxyXG4gICAgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4oe1xyXG4gICAgICByZXNvbHZlczogW0VsZW1lbnRQbHVzUmVzb2x2ZSgpXSxcclxuICAgIH0pLFxyXG4gICAgLy8gYnJvdGxpIFx1NTM4Qlx1N0YyOVxyXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcclxuICAgICAgZGlzYWJsZTogdHJ1ZSwgLy9cdTY2MkZcdTU0MjZcdTc5ODFcdTc1MjhcclxuICAgICAgdGhyZXNob2xkOiAxMDI0MCxcclxuICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICBleHQ6ICcuYnInLFxyXG4gICAgfSksXHJcbiAgICAvLyBnemlwXHU1MzhCXHU3RjI5XHJcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICBkaXNhYmxlOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1Nzk4MVx1NzUyOFxyXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxyXG4gICAgICBhbGdvcml0aG06ICdnemlwJyxcclxuICAgICAgZXh0OiAnLmd6JyxcclxuICAgIH0pLFxyXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1XHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdAdnVldXNlL2NvcmUnXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1dnVlXHU1NDhDdnVlLXJvdXRlclx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFxyXG4gICAgICBkdHM6IGAke1RZUEVTX1BBVEh9L2F1dG8taW1wb3J0LmQudHNgLCAvLyBcdTc1MUZcdTYyMTAgYGF1dG8taW1wb3J0LmQudHNgIFx1NTE2OFx1NUM0MFx1NThGMFx1NjYwRVxyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVlbGVtZW50LXBsdXNcdTdFQzRcdTRFRjZcclxuICAgIENvbXBvbmVudHMoe1xyXG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICBkdHM6IGAke1RZUEVTX1BBVEh9L2NvbXBvbmVudHMuZC50c2AsIC8vIFx1NzUxRlx1NjIxMCBgYXV0by1pbXBvcnQuZC50c2AgXHU1MTY4XHU1QzQwXHU1OEYwXHU2NjBFXHJcbiAgICB9KSxcclxuICAgIC8vIFx1NjUyRlx1NjMwMVx1ODAwMVx1NjVFN1x1NzI0OFx1NjcyQ1xyXG4gICAgLy8gbGVnYWN5UGx1Z2luKHtcclxuICAgIC8vICAgdGFyZ2V0czogWydjaHJvbWUgNTInXSwgLy8gXHU5NzAwXHU4OTgxXHU1MTdDXHU1QkI5XHU3Njg0XHU3NkVFXHU2ODA3XHU1MjE3XHU4ODY4XHVGRjBDXHU1M0VGXHU0RUU1XHU4QkJFXHU3RjZFXHU1OTFBXHU0RTJBXHJcbiAgICAvLyAgIGFkZGl0aW9uYWxMZWdhY3lQb2x5ZmlsbHM6IFsncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lJ10gLy8gXHU5NzYyXHU1NDExSUUxMVx1NjVGNlx1OTcwMFx1ODk4MVx1NkI2NFx1NjNEMlx1NEVGNlxyXG4gICAgLy8gfSlcclxuICAgIHZpc3VhbGl6ZXIoeyBvcGVuOiB0cnVlIH0pLFxyXG4gIF1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15LWdpdGVlXFxcXGtvYV90c19zZXJ2ZXJfZnVsbFxcXFxjbGllbnQtdnVlXFxcXHZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LWdpdGVlXFxcXGtvYV90c19zZXJ2ZXJfZnVsbFxcXFxjbGllbnQtdnVlXFxcXHZpdGVcXFxcdXNlUGF0aC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXktZ2l0ZWUva29hX3RzX3NlcnZlcl9mdWxsL2NsaWVudC12dWUvdml0ZS91c2VQYXRoLnRzXCI7LypcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKiBAQXV0aG9yOiBIWUhcclxuICogQExhc3RFZGl0b3JzOiBIWUhcclxuICogQExhc3RFZGl0VGltZTogMjAyMi0wOC0yOSAxNToxMzo0MVxyXG4gKi9cclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbi8qKlx1ODFFQVx1NUI5QVx1NEU0OVx1NjI1M1x1NTMwNVx1OERFRlx1NUY4NCBcdTgxRUFcdTUyQThcdTYyNTNcdTUzMDVcdTUyMzBcdTY3MkNcdTU3MzBuZ2lueFx1NjcwRFx1NTJBMVx1NTY2OFx1NEUyRCovXHJcbmNvbnN0IEJVSUxEX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vbmdpbngtMS4yMi4wL2h0bWwnKVxyXG5cclxuLyoqc3ZnXHU1NzMwXHU1NzQwICovXHJcbmNvbnN0IFNWR19QQVRIID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3NyYy9hc3NldHMvc3ZnJylcclxuXHJcbi8qKiBAdHlwZXMgXHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2Jlx1NTE2OFx1NUM0MC5kLnRzXHU2NTg3XHU0RUY2XHU1NzMwXHU1NzQwICovXHJcbmNvbnN0IFRZUEVTX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc3JjL0B0eXBlcycpXHJcblxyXG5leHBvcnQge1xyXG4gIC8qKiBAdHlwZXMgXHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2Jlx1NTE2OFx1NUM0MC5kLnRzXHU2NTg3XHU0RUY2XHU1NzMwXHU1NzQwICovXHJcbiAgVFlQRVNfUEFUSCxcclxuICAvKipzdmdcdTU2RkVcdTcyNDdcdThERUZcdTVGODQgKi9cclxuICBTVkdfUEFUSCxcclxuICAvKipcdTk4NzlcdTc2RUVcdTYyNTNcdTUzMDVcdThERUZcdTVGODQgKi9cclxuICBCVUlMRF9QQVRILFxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFNQSxTQUFlLGVBQWU7QUFFOUIsU0FBUyxjQUFjLFNBQVMsOEJBQThCOzs7QUNDOUQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLDJCQUEyQjtBQUVwQyxTQUFTLGtCQUFrQjtBQUMzQixTQUFTLDRCQUE0QjtBQUlyQyxPQUFPLHFCQUFxQjs7O0FDZjVCLE9BQU8sVUFBVTtBQU5qQixJQUFNLG1DQUFtQztBQVN6QyxJQUFNLGFBQWEsS0FBSyxLQUFLLGtDQUFXLHlCQUF5QjtBQUdqRSxJQUFNLFdBQVcsS0FBSyxLQUFLLGtDQUFXLG1CQUFtQjtBQUd6RCxJQUFNLGFBQWEsS0FBSyxLQUFLLGtDQUFXLGVBQWU7OztBRFN2RCxTQUFTLHlCQUF5QiwwQkFBMEI7QUFFNUQsU0FBUyxxQkFBcUI7QUFHOUIsSUFBTyxvQkFBUSxDQUFDLGlCQUEyQztBQUN6RCxTQUFPO0FBQUEsSUFDTCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsSUFDUCxjQUFjO0FBQUEsTUFDWixXQUFXO0FBQUE7QUFBQSxNQUNYLFNBQVMsQ0FBQyxnQkFBZ0IsbUJBQW1CO0FBQUE7QUFBQSxNQUM3QyxPQUFPO0FBQUE7QUFBQSxNQUNQLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxJQUNELHFCQUFxQjtBQUFBO0FBQUEsTUFFbkIsVUFBVSxDQUFDLFFBQVE7QUFBQTtBQUFBLE1BRW5CLFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNELHdCQUF3QjtBQUFBLE1BQ3RCLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztBQUFBLElBQ2pDLENBQUM7QUFBQTtBQUFBLElBRUQsZ0JBQWdCO0FBQUEsTUFDZCxTQUFTO0FBQUE7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQTtBQUFBLElBRUQsZ0JBQWdCO0FBQUEsTUFDZCxTQUFTO0FBQUE7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVc7QUFBQSxNQUNYLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFBQTtBQUFBLElBRUQsV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLE9BQU8sY0FBYyxjQUFjO0FBQUE7QUFBQSxNQUM3QyxLQUFLLEdBQUcsVUFBVTtBQUFBO0FBQUEsTUFDbEIsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNqQyxLQUFLLEdBQUcsVUFBVTtBQUFBO0FBQUEsSUFDcEIsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU1ELFdBQVcsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUFBLEVBQzNCO0FBQ0Y7OztBRGpGQSxJQUFNQSxvQ0FBbUM7QUFZekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLE1BQU0sU0FBUyxNQUFNO0FBRTNELFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsVUFBUSxJQUFJO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLGVBQWUsU0FBUztBQUU5QixTQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJTCxTQUFTLGtCQUFVLFlBQVk7QUFBQSxJQUMvQixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFnQk4sTUFBTTtBQUFBLE1BQ04sTUFBTSxJQUFJO0FBQUE7QUFBQSxNQUVWLElBQUk7QUFBQSxRQUNGLE9BQU8sQ0FBQyx1QkFBdUIsUUFBUSxJQUFJLENBQUMsR0FBRyxhQUFhO0FBQUEsTUFDOUQ7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUdBLFNBQVM7QUFBQTtBQUFBLE1BRVAsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRQyxtQ0FBVyxPQUFPO0FBQUEsUUFDL0IsS0FBSyxRQUFRQSxtQ0FBVyxJQUFJO0FBQUEsUUFDNUIsTUFBTSxRQUFRQSxtQ0FBVyxXQUFXO0FBQUEsTUFDdEM7QUFBQSxNQUNBLFlBQVksQ0FBQyxPQUFPLE9BQU8sUUFBUSxNQUFNO0FBQUE7QUFBQSxJQUUzQztBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUEsTUFFTCxhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQTtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU9oQixpQkFBaUIsTUFBTTtBQUVyQixrQkFBTSxxQkFBcUI7QUFDM0Isa0JBQU0scUJBQXFCO0FBQzNCLGtCQUFNLFFBQVEsbUJBQW1CLEtBQUssSUFBSTtBQUMxQyxrQkFBTSxjQUFjLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFHdkMsZ0JBQUksT0FBTyxjQUFjLEtBQUssTUFBTSxZQUFZLE1BQU0sRUFBRSxRQUFRLG9CQUFvQixFQUFFO0FBQ3RGLGdCQUFJLEtBQUssV0FBVyxHQUFHO0FBQUcscUJBQU8sS0FBSyxNQUFNLENBQUM7QUFDN0MsbUJBQU87QUFBQSxVQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFRRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVUO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
