/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-29 17:39:02
 */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// 查看打包详情
import { visualizer } from 'rollup-plugin-visualizer';
import { Is } from './vite/index'
export default defineConfig(({ command, mode, ssrBuild }) => {
  /**根据 "mode" 值 读取获取本地环境变量中的.env.[mode]中 VITE_BASE_URL 的值 */
  const baseUrl = loadEnv(mode, process.cwd()).VITE_BASE_URL
  /**是否是生产环境 */
  const isProduction = mode === 'production'
  console.log({ mode, baseUrl, isProduction })
  return {
    plugins: [
      react(),
      /**检测打包体积（可视化） */
      visualizer(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      port: 8686,
      // proxy:{
      //   '/upload':'http'
      // }
    },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true,
    //       modifyVars: {
    //         '@primary-color': '#4377FE' //设置antd主题色
    //       }
    //     }
    //   }
    // },
    build: {
      /**清空原来打包的文件 */
      emptyOutDir: true,
      rollupOptions: {
        // input: ['src/pages/*.js'],
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id: string) {
            //静态资源分拆打包
            if (id.includes('node_modules')) {
              const res = id.toString().split('node_modules/').pop().split('/')[0]
              return res
            }
          }
        }
      }
    }
  }
})
