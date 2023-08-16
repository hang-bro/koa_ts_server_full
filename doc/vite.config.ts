/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-28 20:08:45
 */
// 类型提示
import path, { resolve } from 'path'
import { defineConfig, loadEnv, searchForWorkspaceRoot } from 'vite'
import usePlugin from './vite/usePlugin'

// @ts-ignore
export default defineConfig(({ command, mode, ssrBuild }) => {
  /**根据 "mode" 值 读取获取本地环境变量中的.env.[mode]中 VITE_BASE_URL 的值 */
  const env = loadEnv(mode, process.cwd())
  console.log({
    mode,
    command,
  })
  const isProduction = mode === 'production'

  return {
    // 生产或开发环境下的基础路径
    base: '/doc',
    // 需要用到的插件数组
    plugins: usePlugin(isProduction),
    server: {
      // https: {
      //   cert: fs.readFileSync(path.join(__dirname, './keys/cert.crt')),
      //   key: fs.readFileSync(path.join(__dirname, './keys/cert.key')),
      // },
      host: true,
      port: env.VITE_FRONT_PORT,
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd()), '../app/enum'],
      },
    },
    //
    resolve: {
      // 设置文件目录别名
      alias: {
        '@': resolve(__dirname, './src'),
        '@@': resolve(__dirname, '../server'),
      },
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      //
    },
    build: {
      outDir: path.join(__dirname, '../server/public/doc'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          // // 最小化拆分包
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // },
        },
      },
    },
    esbuild: {
      // drop: isProduction ? ['console', 'debugger'] : [], // 删除 所有的console 和 debugger
    },
  }
})
