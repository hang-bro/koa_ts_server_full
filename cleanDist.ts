/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-05 10:34:12
 */


import 'zx/globals'

async function main() {
  const distDir = path.join(__dirname, './dist')
  const distZipDir = path.join(__dirname, './dist.zip')
  console.log(`正在删除dist文件夹和压缩文件`,);
  if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true })
  if (fs.existsSync(distZipDir)) fs.rmSync(distZipDir, { recursive: true })
  console.log(`删除完成`,);

}
main()
