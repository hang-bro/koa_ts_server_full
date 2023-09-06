/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-28 20:08:45
 */
import path, { resolve } from 'path'
import fs from 'fs'
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
      https: {
        cert: fs.readFileSync(path.join(__dirname, './keys/cert.crt')),
        key: fs.readFileSync(path.join(__dirname, './keys/cert.key')),
      },
      host: true,
      port: env.VITE_FRONT_PORT,
      /**可读取的文件夹 */
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd()), '../app/enum'],
      },
    },
    //
    resolve: {
      // 设置文件目录别名
      alias: {
        '@': resolve(__dirname, './src'),
        '~': resolve(__dirname, './'),
        '@@': resolve(__dirname, '../server'),
      },
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      //
    },
    build: {
      // outDir: path.join(__dirname, '../docBuild/koa_ts_server_full_doc'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
          entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
          assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
          /**
           * @description  清除文件名格式不正确问题
           * @param name
           * @returns
           */
          // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
          sanitizeFileName(name) {
            // eslint-disable-next-line no-control-regex
            const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
            const DRIVE_LETTER_REGEX = /^[a-z]:/i
            const match = DRIVE_LETTER_REGEX.exec(name)
            const driveLetter = match ? match[0] : ''
            // A `:` is only allowed as part of a windows drive letter (ex: C:\foo)
            // Otherwise, avoid them because they can refer to NTFS alternate data streams.
            let file = driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
            if (file.startsWith('_')) file = file.slice(1) /**去除首位字符串为 "_" , fix github page访问不了的问题*/
            return file
          },

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
