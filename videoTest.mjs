#!/usr/bin/env zx
import 'zx/globals'
import { mkdirSync, rmSync } from 'fs'
const videoPath = path.join(__dirname, "./app/public/files")
const videos = fs.readdirSync(videoPath)

cd(videoPath)

for (const video of videos) {
  const dirName = `${video.split(".")[0]}`
  mkdirSync(`${videoPath}/${dirName}`)
  mkdirSync(`${videoPath}/${dirName}/chunk`)
  //   /**
  //    * 下载 m3u8文件为mp4
  //    */
  //   await $`ffmpeg -i "https://xushanxiang.com/demo/ffmpeg/hls265/output.m3u8" -vcodec copy -acodec copy -absf aac_adtstoasc test\\output.mp4`

  /**
   * 把MP4转成ts文件
   */
  await $`ffmpeg -y -i ${video} -vcodec copy -acodec copy -vbsf h264_mp4toannexb ${dirName}\\${dirName}.ts`
  /**
   * 切分ts文件
   */
  await $`ffmpeg -i ${dirName}\\${dirName}.ts -c copy -map 0 -f segment -segment_list ${dirName}\\chunk\\index.m3u8 -segment_time 5 ${dirName}\\chunk\\index%03d.ts  `

  /**
   * 删除提示文件
   */
  rmSync(`${videoPath}/${dirName}/${dirName}.ts`, { recursive: true })
}


