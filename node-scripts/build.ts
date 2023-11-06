/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-10 10:11:08
 */

import 'zx/globals'
const args = process.argv.slice(2)

async function main(params: string) {
  const distDir = path.join(__dirname, './dist')

  const distZipDir = path.join(__dirname, './dist.zip')
  console.log(`正在删除dist文件夹`)
  if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true })
  if (fs.existsSync(distZipDir)) fs.rmSync(distZipDir, { recursive: true })
  console.log(`打包中...`)
  await $`tsc`
  /****************************** package.json **************************************/
  const packageJson = fs.readFileSync(path.join(__dirname, './package.json')).toString()
  const jsonData = JSON.parse(packageJson)
  jsonData._moduleAliases = {
    '@': './',
    '@@': '../'
  }
  fs.writeFileSync(`${distDir}/package.json`, JSON.stringify(jsonData))
  console.log(`修改package.json文件完成`)
  /****************************** package.json end **************************************/

  /****************************** .env **************************************/

  const envFile = fs.readFileSync(path.join(__dirname, './server/.env.prod')).toString()
  fs.writeFileSync(`${distDir}/.env`, envFile)
  console.log(`修改.env.prod文件完成`)

  /****************************** .env **************************************/

  /****************************** .ssl **************************************/
  const sslDir = path.join(__dirname, './server/ssl')
  const distSslDir = `${distDir}/ssl`
  if (!fs.existsSync(distSslDir)) fs.mkdirSync(distSslDir)
  fs.readdirSync(sslDir).map(file => {
    fs.copyFileSync(`${sslDir}/${file}`, `${distSslDir}/${file}`, fs.constants.COPYFILE_EXCL)
  })

  /****************************** .ssl **************************************/

  /****************************** doc **************************************/

  if (params && params.includes('doc')) {
    await $`cd ./doc && npx vite build --outDir="../dist/public/doc"`
  }
  /****************************** doc **************************************/

  /****************************** 压缩 .zip **************************************/
  const archiver = require('archiver')
  const output = fs.createWriteStream('dist.zip')
  const archive = archiver('zip')

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)
  // 文件夹压缩
  archive.directory('./dist', false)

  archive.finalize()

  // fs.rmSync(distDir, { recursive: true })
  /****************************** 压缩 .zip **************************************/

  console.log(`打包完成!!!`)
  console.log(`执行 "pnpm run dev:build"  可启动打包文件`)
}

main(args[0])
