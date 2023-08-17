/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-10 10:11:08
 */

import 'zx/globals'

async function main() {
  const distDir = path.join(__dirname, './github-page')
  // const distZipDir = path.join(__dirname, './dist.zip')
  // console.log(`正在删除dist文件夹`)
  // if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true })
  // if (fs.existsSync(distZipDir)) fs.rmSync(distZipDir, { recursive: true })
  console.log(`distDir ==>`, distDir)
  // await $`cd ./docs && npx vite build --outDir="../github-page" --base="/koa_ts_server_full_doc"`
  await $`cd ./docs`
  await $`cd D:\\my-gitee\\koa_ts_server_full\\github-page`
  // await $`cd ../`
  // await $`cd ./github-page`
  await $`git add .`
  await $`git commit -m"commit github-page"`
  await $`git push`
}

main()
