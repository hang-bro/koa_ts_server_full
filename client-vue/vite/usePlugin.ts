/*
 * @Description:vite插件
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-02-08 10:18:59
 */
/**
 * 根据项目所用框架 安装插件，并注册到 plugin里面去
 */
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import setupExtend from 'vite-plugin-vue-setup-extend'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 查看打包详情
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
/**
 * 压缩 gzip
 */
import viteCompression from 'vite-plugin-compression'
import { SVG_PATH, TYPES_PATH } from './usePath'
import { PluginOption } from 'vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

export default (isProduction?: boolean): PluginOption[] => {
  return [
    vue(),
    setupExtend(),
    vueJsx(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [SVG_PATH],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
    }),
    // brotli 压缩
    viteCompression({
      disable: true, //是否禁用
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // gzip压缩
    viteCompression({
      disable: true, //是否禁用
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 自动引入
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'], // 自动导入vue和vue-router相关函数
      dts: `${TYPES_PATH}/auto-import.d.ts`, // 生成 `auto-import.d.ts` 全局声明
      resolvers: [ElementPlusResolver()],
    }),
    // 自动引入element-plus组件
    Components({
      resolvers: [ElementPlusResolver()],
      dts: `${TYPES_PATH}/components.d.ts`, // 生成 `auto-import.d.ts` 全局声明
    }),
    // 支持老旧版本
    // legacyPlugin({
    //   targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    // })
    visualizer({ open: true }),
  ]
}
