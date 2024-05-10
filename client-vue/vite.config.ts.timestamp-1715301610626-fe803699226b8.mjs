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
var usePlugin_default = (isProduction) => {
  return [
    vue(),
    setupExtend(),
    vueJsx(),
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
      //   '/api': {
      //     target: 'http://192.168.5.240:2335/api',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS91c2VQbHVnaW4udHMiLCAidml0ZS91c2VQYXRoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXktZ2l0ZWVcXFxca29hX3RzX3NlcnZlcl9mdWxsXFxcXGNsaWVudC12dWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LWdpdGVlXFxcXGtvYV90c19zZXJ2ZXJfZnVsbFxcXFxjbGllbnQtdnVlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1naXRlZS9rb2FfdHNfc2VydmVyX2Z1bGwvY2xpZW50LXZ1ZS92aXRlLmNvbmZpZy50c1wiOy8qXHJcbiAqIEBEZXNjcmlwdGlvbjpcclxuICogQEF1dGhvcjogSFlIXHJcbiAqIEBMYXN0RWRpdG9yczogSFlIXHJcbiAqIEBMYXN0RWRpdFRpbWU6IDIwMjMtMDctMjggMjA6MDg6NDVcclxuICovXHJcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgc2VhcmNoRm9yV29ya3NwYWNlUm9vdCB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB1c2VQbHVnaW4gZnJvbSAnLi92aXRlL3VzZVBsdWdpbidcclxuXHJcbi8vIEB0cy1pZ25vcmVcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUsIHNzckJ1aWxkIH0pID0+IHtcclxuICAvKipcdTY4MzlcdTYzNkUgXCJtb2RlXCIgXHU1MDNDIFx1OEJGQlx1NTNENlx1ODNCN1x1NTNENlx1NjcyQ1x1NTczMFx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1NEUyRFx1NzY4NC5lbnYuW21vZGVdXHU0RTJEIFZJVEVfQkFTRV9VUkwgXHU3Njg0XHU1MDNDICovXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIGNvbnNvbGUubG9nKHtcclxuICAgIG1vZGUsXHJcbiAgICBjb21tYW5kLFxyXG4gIH0pXHJcbiAgY29uc3QgaXNQcm9kdWN0aW9uID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAvLyBcdTc1MUZcdTRFQTdcdTYyMTZcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMEJcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcclxuICAgIC8vIGJhc2U6ICcvZG9jJyxcclxuICAgIC8vIFx1OTcwMFx1ODk4MVx1NzUyOFx1NTIzMFx1NzY4NFx1NjNEMlx1NEVGNlx1NjU3MFx1N0VDNFxyXG4gICAgcGx1Z2luczogdXNlUGx1Z2luKGlzUHJvZHVjdGlvbiksXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgLy8gcHJveHk6IHtcclxuICAgICAgLy8gICAnL2FwaSc6IHtcclxuICAgICAgLy8gICAgIHRhcmdldDogJ2h0dHA6Ly8xOTIuMTY4LjUuMjQwOjIzMzUvYXBpJyxcclxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgLy8gICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgIC8vICAgfSxcclxuICAgICAgLy8gfSxcclxuICAgICAgLy8gaHR0cHM6IHtcclxuICAgICAgLy8gICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4va2V5cy9jZXJ0LmNydCcpKSxcclxuICAgICAgLy8gICBrZXk6IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9rZXlzL2NlcnQua2V5JykpLFxyXG4gICAgICAvLyB9LFxyXG4gICAgICBob3N0OiB0cnVlLFxyXG4gICAgICBwb3J0OiBlbnYuVklURV9GUk9OVF9QT1JULFxyXG4gICAgICAvKipcdTUzRUZcdThCRkJcdTUzRDZcdTc2ODRcdTY1ODdcdTRFRjZcdTU5MzkgKi9cclxuICAgICAgZnM6IHtcclxuICAgICAgICBhbGxvdzogW3NlYXJjaEZvcldvcmtzcGFjZVJvb3QocHJvY2Vzcy5jd2QoKSksICcuLi9hcHAvZW51bSddLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICAvL1xyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAvLyBcdThCQkVcdTdGNkVcdTY1ODdcdTRFRjZcdTc2RUVcdTVGNTVcdTUyMkJcdTU0MERcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgICAgICAnfic6IHJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcclxuICAgICAgICAnQEAnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NlcnZlcicpLFxyXG4gICAgICB9LFxyXG4gICAgICBleHRlbnNpb25zOiBbJy5qcycsICcudHMnLCAnLnRzeCcsICcuanN4J10sXHJcbiAgICAgIC8vXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgLy8gb3V0RGlyOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vZG9jQnVpbGQva29hX3RzX3NlcnZlcl9mdWxsX2RvYycpLFxyXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJywgLy8gXHU1RjE1XHU1MTY1XHU2NTg3XHU0RUY2XHU1NDBEXHU3Njg0XHU1NDBEXHU3OUYwXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTUzMDVcdTc2ODRcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcdTU0MERcdTc5RjBcclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsIC8vIFx1OEQ0NFx1NkU5MFx1NjU4N1x1NEVGNlx1NTBDRiBcdTVCNTdcdTRGNTNcdUZGMENcdTU2RkVcdTcyNDdcdTdCNDlcclxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQGRlc2NyaXB0aW9uICBcdTZFMDVcdTk2NjRcdTY1ODdcdTRFRjZcdTU0MERcdTY4M0NcdTVGMEZcdTRFMERcdTZCNjNcdTc4NkVcdTk1RUVcdTk4OThcclxuICAgICAgICAgICAqIEBwYXJhbSBuYW1lXHJcbiAgICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC9ibG9iL21hc3Rlci9zcmMvdXRpbHMvc2FuaXRpemVGaWxlTmFtZS50c1xyXG4gICAgICAgICAgc2FuaXRpemVGaWxlTmFtZShuYW1lKSB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250cm9sLXJlZ2V4XHJcbiAgICAgICAgICAgIGNvbnN0IElOVkFMSURfQ0hBUl9SRUdFWCA9IC9bXFx1MDAwMC1cXHUwMDFGXCIjJCYqKyw6Ozw9Pj9bXFxdXmB7fH1cXHUwMDdGXS9nXHJcbiAgICAgICAgICAgIGNvbnN0IERSSVZFX0xFVFRFUl9SRUdFWCA9IC9eW2Etel06L2lcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBEUklWRV9MRVRURVJfUkVHRVguZXhlYyhuYW1lKVxyXG4gICAgICAgICAgICBjb25zdCBkcml2ZUxldHRlciA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnJ1xyXG4gICAgICAgICAgICAvLyBBIGA6YCBpcyBvbmx5IGFsbG93ZWQgYXMgcGFydCBvZiBhIHdpbmRvd3MgZHJpdmUgbGV0dGVyIChleDogQzpcXGZvbylcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhdm9pZCB0aGVtIGJlY2F1c2UgdGhleSBjYW4gcmVmZXIgdG8gTlRGUyBhbHRlcm5hdGUgZGF0YSBzdHJlYW1zLlxyXG4gICAgICAgICAgICBsZXQgZmlsZSA9IGRyaXZlTGV0dGVyICsgbmFtZS5zbGljZShkcml2ZUxldHRlci5sZW5ndGgpLnJlcGxhY2UoSU5WQUxJRF9DSEFSX1JFR0VYLCAnJylcclxuICAgICAgICAgICAgaWYgKGZpbGUuc3RhcnRzV2l0aCgnXycpKSBmaWxlID0gZmlsZS5zbGljZSgxKSAvKipcdTUzQkJcdTk2NjRcdTk5OTZcdTRGNERcdTVCNTdcdTdCMjZcdTRFMzJcdTRFM0EgXCJfXCIgLCBmaXggZ2l0aHViIHBhZ2VcdThCQkZcdTk1RUVcdTRFMERcdTRFODZcdTc2ODRcdTk1RUVcdTk4OTgqL1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsZVxyXG4gICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAvLyAvLyBcdTY3MDBcdTVDMEZcdTUzMTZcdTYyQzZcdTUyMDZcdTUzMDVcclxuICAgICAgICAgIC8vIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgLy8gICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAvLyAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcclxuICAgICAgICAgIC8vICAgfVxyXG4gICAgICAgICAgLy8gfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGVzYnVpbGQ6IHtcclxuICAgICAgLy8gZHJvcDogaXNQcm9kdWN0aW9uID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbXSwgLy8gXHU1MjIwXHU5NjY0IFx1NjI0MFx1NjcwOVx1NzY4NGNvbnNvbGUgXHU1NDhDIGRlYnVnZ2VyXHJcbiAgICB9LFxyXG4gIH1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteS1naXRlZVxcXFxrb2FfdHNfc2VydmVyX2Z1bGxcXFxcY2xpZW50LXZ1ZVxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteS1naXRlZVxcXFxrb2FfdHNfc2VydmVyX2Z1bGxcXFxcY2xpZW50LXZ1ZVxcXFx2aXRlXFxcXHVzZVBsdWdpbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXktZ2l0ZWUva29hX3RzX3NlcnZlcl9mdWxsL2NsaWVudC12dWUvdml0ZS91c2VQbHVnaW4udHNcIjsvKlxyXG4gKiBARGVzY3JpcHRpb246dml0ZVx1NjNEMlx1NEVGNlxyXG4gKiBAQXV0aG9yOiBIWUhcclxuICogQExhc3RFZGl0b3JzOiBIWUhcclxuICogQExhc3RFZGl0VGltZTogMjAyMy0wMi0wOCAxMDoxODo1OVxyXG4gKi9cclxuLyoqXHJcbiAqIFx1NjgzOVx1NjM2RVx1OTg3OVx1NzZFRVx1NjI0MFx1NzUyOFx1Njg0Nlx1NjdCNiBcdTVCODlcdTg4QzVcdTYzRDJcdTRFRjZcdUZGMENcdTVFNzZcdTZDRThcdTUxOENcdTUyMzAgcGx1Z2luXHU5MUNDXHU5NzYyXHU1M0JCXHJcbiAqL1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgc2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuLy8gXHU2N0U1XHU3NzBCXHU2MjUzXHU1MzA1XHU4QkU2XHU2MEM1XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG4vKipcclxuICogXHU1MzhCXHU3RjI5IGd6aXBcclxuICovXHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcbmltcG9ydCB7IFNWR19QQVRILCBUWVBFU19QQVRIIH0gZnJvbSAnLi91c2VQYXRoJ1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbiwgRWxlbWVudFBsdXNSZXNvbHZlIH0gZnJvbSAndml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGlzUHJvZHVjdGlvbj86IGJvb2xlYW4pOiBQbHVnaW5PcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgc2V0dXBFeHRlbmQoKSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAvLyBTcGVjaWZ5IHRoZSBpY29uIGZvbGRlciB0byBiZSBjYWNoZWRcclxuICAgICAgaWNvbkRpcnM6IFtTVkdfUEFUSF0sXHJcbiAgICAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XHJcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XHJcbiAgICAgIHJlc29sdmVzOiBbRWxlbWVudFBsdXNSZXNvbHZlKCldLFxyXG4gICAgfSksXHJcbiAgICAvLyBicm90bGkgXHU1MzhCXHU3RjI5XHJcbiAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICBkaXNhYmxlOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1Nzk4MVx1NzUyOFxyXG4gICAgICB0aHJlc2hvbGQ6IDEwMjQwLFxyXG4gICAgICBhbGdvcml0aG06ICdicm90bGlDb21wcmVzcycsXHJcbiAgICAgIGV4dDogJy5icicsXHJcbiAgICB9KSxcclxuICAgIC8vIGd6aXBcdTUzOEJcdTdGMjlcclxuICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgIGRpc2FibGU6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU3OTgxXHU3NTI4XHJcbiAgICAgIHRocmVzaG9sZDogMTAyNDAsXHJcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxyXG4gICAgICBleHQ6ICcuZ3onLFxyXG4gICAgfSksXHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ0B2dWV1c2UvY29yZSddLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWVcdTU0OEN2dWUtcm91dGVyXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHJcbiAgICAgIGR0czogYCR7VFlQRVNfUEFUSH0vYXV0by1pbXBvcnQuZC50c2AsIC8vIFx1NzUxRlx1NjIxMCBgYXV0by1pbXBvcnQuZC50c2AgXHU1MTY4XHU1QzQwXHU1OEYwXHU2NjBFXHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICB9KSxcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NWVsZW1lbnQtcGx1c1x1N0VDNFx1NEVGNlxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIGR0czogYCR7VFlQRVNfUEFUSH0vY29tcG9uZW50cy5kLnRzYCwgLy8gXHU3NTFGXHU2MjEwIGBhdXRvLWltcG9ydC5kLnRzYCBcdTUxNjhcdTVDNDBcdTU4RjBcdTY2MEVcclxuICAgIH0pLFxyXG4gICAgLy8gXHU2NTJGXHU2MzAxXHU4MDAxXHU2NUU3XHU3MjQ4XHU2NzJDXHJcbiAgICAvLyBsZWdhY3lQbHVnaW4oe1xyXG4gICAgLy8gICB0YXJnZXRzOiBbJ2Nocm9tZSA1MiddLCAvLyBcdTk3MDBcdTg5ODFcdTUxN0NcdTVCQjlcdTc2ODRcdTc2RUVcdTY4MDdcdTUyMTdcdTg4NjhcdUZGMENcdTUzRUZcdTRFRTVcdThCQkVcdTdGNkVcdTU5MUFcdTRFMkFcclxuICAgIC8vICAgYWRkaXRpb25hbExlZ2FjeVBvbHlmaWxsczogWydyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnXSAvLyBcdTk3NjJcdTU0MTFJRTExXHU2NUY2XHU5NzAwXHU4OTgxXHU2QjY0XHU2M0QyXHU0RUY2XHJcbiAgICAvLyB9KVxyXG4gICAgdmlzdWFsaXplcih7IG9wZW46IHRydWUgfSksXHJcbiAgXVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXktZ2l0ZWVcXFxca29hX3RzX3NlcnZlcl9mdWxsXFxcXGNsaWVudC12dWVcXFxcdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXktZ2l0ZWVcXFxca29hX3RzX3NlcnZlcl9mdWxsXFxcXGNsaWVudC12dWVcXFxcdml0ZVxcXFx1c2VQYXRoLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1naXRlZS9rb2FfdHNfc2VydmVyX2Z1bGwvY2xpZW50LXZ1ZS92aXRlL3VzZVBhdGgudHNcIjsvKlxyXG4gKiBARGVzY3JpcHRpb246XHJcbiAqIEBBdXRob3I6IEhZSFxyXG4gKiBATGFzdEVkaXRvcnM6IEhZSFxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDIyLTA4LTI5IDE1OjEzOjQxXHJcbiAqL1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5cclxuLyoqXHU4MUVBXHU1QjlBXHU0RTQ5XHU2MjUzXHU1MzA1XHU4REVGXHU1Rjg0IFx1ODFFQVx1NTJBOFx1NjI1M1x1NTMwNVx1NTIzMFx1NjcyQ1x1NTczMG5naW54XHU2NzBEXHU1MkExXHU1NjY4XHU0RTJEKi9cclxuY29uc3QgQlVJTERfUEFUSCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi9uZ2lueC0xLjIyLjAvaHRtbCcpXHJcblxyXG4vKipzdmdcdTU3MzBcdTU3NDAgKi9cclxuY29uc3QgU1ZHX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vc3JjL2Fzc2V0cy9zdmcnKVxyXG5cclxuLyoqIEB0eXBlcyBcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjYmXHU1MTY4XHU1QzQwLmQudHNcdTY1ODdcdTRFRjZcdTU3MzBcdTU3NDAgKi9cclxuY29uc3QgVFlQRVNfUEFUSCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9zcmMvQHR5cGVzJylcclxuXHJcbmV4cG9ydCB7XHJcbiAgLyoqIEB0eXBlcyBcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjYmXHU1MTY4XHU1QzQwLmQudHNcdTY1ODdcdTRFRjZcdTU3MzBcdTU3NDAgKi9cclxuICBUWVBFU19QQVRILFxyXG4gIC8qKnN2Z1x1NTZGRVx1NzI0N1x1OERFRlx1NUY4NCAqL1xyXG4gIFNWR19QQVRILFxyXG4gIC8qKlx1OTg3OVx1NzZFRVx1NjI1M1x1NTMwNVx1OERFRlx1NUY4NCAqL1xyXG4gIEJVSUxEX1BBVEgsXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQU1BLFNBQWUsZUFBZTtBQUU5QixTQUFTLGNBQWMsU0FBUyw4QkFBOEI7OztBQ0M5RCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FB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QjtBQUFBO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU9oQixpQkFBaUIsTUFBTTtBQUVyQixrQkFBTSxxQkFBcUI7QUFDM0Isa0JBQU0scUJBQXFCO0FBQzNCLGtCQUFNLFFBQVEsbUJBQW1CLEtBQUssSUFBSTtBQUMxQyxrQkFBTSxjQUFjLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFHdkMsZ0JBQUksT0FBTyxjQUFjLEtBQUssTUFBTSxZQUFZLE1BQU0sRUFBRSxRQUFRLG9CQUFvQixFQUFFO0FBQ3RGLGdCQUFJLEtBQUssV0FBVyxHQUFHO0FBQUcscUJBQU8sS0FBSyxNQUFNLENBQUM7QUFDN0MsbUJBQU87QUFBQSxVQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFRRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUE7QUFBQSxJQUVUO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
