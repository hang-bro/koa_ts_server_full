/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-17 09:34:00
 */
import { ffmpegLogger } from "@/logger";
import ffmpeg from "ffmpeg";
import ffmpeg2 from "fluent-ffmpeg";
import path from "path";
type IToMp3 = {
  error?: boolean
  file?: string
  message?: string
}
class ffmpegService {
  /** */
  async slice(videoPath: string, filePath: string, name: string, filename: string) {

    return new Promise<IToMp3>((resolve, reject) => {
      ffmpeg2(videoPath)
        .videoCodec('libx264') // 设置视频编解码器
        // .audioCodec('libfaac') // 设置 音频解码器
        .format('hls') // 输出视频格式
        .outputOptions('-hls_list_size 0') //  -hls_list_size n:设置播放列表保存的最多条目，设置为0会保存有所片信息，默认值为5
        .outputOption('-hls_time 5') // -hls_time n: 设置每片的长度，默认值为2。单位为秒
        .output(`${filePath}/${name}/chunk/index.m3u8 `) // 输出文件
        .on('progress', (progress) => { // 监听切片进度
          console.log('Processing: ' + progress.percent + '% done');
        })
        .on('end', (e) => { // 监听结束
          console.log("视频切片完成");
          resolve({ file: e })
        })
        .run();

    })
  }

  /** */
  async toMp3(videoPath: string, filePath: string, name: string,) {

    return new Promise<IToMp3>((resolve, reject) => {
      new ffmpeg(videoPath)
        .then(video => {
          video.fnExtractSoundToMP3(`${filePath}/${name}/${name}.mp3`, function (error, file) {
            if (!error) {
              resolve({ file })
            } else {
              ffmpegLogger.warn(error.message)
              resolve({ error: true, message: error.message });
            }
          })
        })


    })
  }

  /** */
  async frameToJPG(videoPath: string, filePath: string, name: string,) {

    return new Promise<any>((resolve, reject) => {
      new ffmpeg(videoPath)
        .then(video => {
          // {
          //   start_time: number, // 开始的时间,不太支持
          //   duration_time: number, // 持续的时间
          //   frame_rate: number, // 每秒的帧数
          //   keep_aspect_ratio: false, // 保持宽高比
          //   size: number, // 截取图片的尺寸 不太支持
          //   number: number, // 要截取的帧数
          //   every_n_frames: number, // 间隔几帧截取
          //   every_n_seconds: number, // 间隔几秒截取，不太支持
          //   every_n_percentage: number,// 间隔百分比截取，不太支持
          //   keep_pixel_aspect_ratio: true,// Mantain the original pixel video aspect ratio
          //   padding_color: 'black', // Padding color
          //   file_name: null,
          //   }

          video.fnExtractFrameToJPG(`${filePath}/${name}/frame/`, {
            frame_rate: 1,
            number: 1,
            file_name: `${name}_%t_%s`
          }, function (error, file) {
            if (!error) {
              resolve({ file })
            } else {
              ffmpegLogger.warn(error.message)
              resolve({ error: true, message: error.message });
            }
          })
        })


    })
  }

  /** */
  async addWatermark(videoPath: string, filePath: string, filename: string,) {

    return new Promise<IToMp3>((resolve, reject) => {
      new ffmpeg(videoPath)
        .then(video => {
          // {
          //   position: "SW", // Position: NE NC NW SE SC SW C CE CW
          //   margin_nord: null, // Margin nord
          //   margin_sud: null, // Margin sud
          //   margin_east: null, // Margin east
          //   margin_west: null, // Margin west
          //   };
          // video.fnAddWatermark（watermarkPath，newFilepath，settings，callback
          const waterMarkPath = path.join(__dirname, "../public/files/water-mark.png")
          video.fnAddWatermark(waterMarkPath, `${filePath}/water_mark_${filename}`, {
            position: 'NW'
          }, function (error, file) {
            if (!error) {
              resolve({ file })
            } else {
              ffmpegLogger.warn(error.message)
              resolve({ error: true, message: error.message });
            }
          });


        })


    })
  }
}
export default new ffmpegService()
