/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-16 09:53:03
 */

import { Get, Post,Controller } from '@/decorator/index'
import ffmpegService from '@/service/ffmpeg.service'
import response from '@/utils/response'
import fs from 'fs'
import Joi from 'joi'
import { Context } from 'koa'
import path from 'path'
const filePath = path.join(__dirname, `../public/files`)

@Controller('/api/ffmpeg')
export default class ffmpegController {

  /** */
  @Post("", 'ffmpeg')
  async index(ctx: Context) {
    const schema = Joi.object({
      filename: Joi.required()
    })
    const { error, value: { filename } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const name = filename.split('.')[0]
    const videoPath = `${filePath}/${name}/${filename}`

    console.log(`videoPath ==>`, videoPath);
    if (!fs.existsSync(videoPath)) return response.error(ctx, '文件不存在!')

    // await ffmpegService.addWatermark(videoPath, filePath, filename)

    const { error: e, message, file } = await ffmpegService.slice(videoPath, filePath, name, filename)
    if (e) return response.error(ctx, message)

    return response.success(ctx,)
  }



  /** */
  @Post("/addWatermark", '为视频添加水印')
  /** 
   * 为视频添加水印
  */
  async addWatermark(ctx: Context) {
    const schema = Joi.object({
      filename: Joi.required()
    })
    const { error, value: { filename } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const name = filename.split('.')[0]

    const videoPath = `${filePath}/${name}/${filename}`

    console.log(`videoPath ==>`, videoPath);
    if (!fs.existsSync(videoPath)) return response.error(ctx, '文件不存在!')


    const { error: e, message, file } = await ffmpegService.addWatermark(videoPath, filePath, filename)
    if (e) return response.error(ctx, message)

    return response.success(ctx, file)
  }



  @Post("/toMp3", '把视频的音频流提取为mp3文件')
  async toMp3(ctx: Context) {
    const schema = Joi.object({
      filename: Joi.required()
    })
    const { error, value: { filename } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const name = filename.split('.')[0]

    const videoPath = `${filePath}/${name}/${filename}`

    console.log(`videoPath ==>`, videoPath);
    if (!fs.existsSync(videoPath)) return response.error(ctx, '文件不存在!')


    const { error: e, message, file } = await ffmpegService.toMp3(videoPath, filePath, name)
    if (e) return response.error(ctx, message)

    return response.success(ctx, file)
  }


  /** */
  @Post("/frameToJPG", '截取视频的一个或多个帧，返回给我们一个图像数组')
  /** 
   * 截取视频的一个或多个帧，返回给我们一个图像数组
  */
  async frameToJPG(ctx: Context) {
    const schema = Joi.object({
      filename: Joi.required()
    })
    const { error, value: { filename } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const name = filename.split('.')[0]

    const videoPath = `${filePath}/${name}/${filename}`

    console.log(`videoPath ==>`, videoPath);
    if (!fs.existsSync(videoPath)) return response.error(ctx, '文件不存在!')


    const { error: e, message, file } = await ffmpegService.frameToJPG(videoPath, filePath, name)
    if (e) return response.error(ctx, message)

    return response.success(ctx, file)
  }



  /** */
  @Post("/slice", '视频文件进行切片')
  /** 
   * 视频文件进行切片
  */
  async slice(ctx: Context) {
    const schema = Joi.object({
      filename: Joi.required()
    })
    const { error, value: { filename } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const name = filename.split('.')[0]

    const videoPath = `${filePath}/${name}/${filename}`

    console.log(`videoPath ==>`, videoPath);
    if (!fs.existsSync(videoPath)) return response.error(ctx, '文件不存在!')


    // const { error: e, message, file } = await ffmpegService.slice(videoPath, filePath, name)
    // if (e) return response.error(ctx, message)

    // return response.success(ctx, file)
  }





}
