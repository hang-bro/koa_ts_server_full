/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-14 13:56:51
 */

import config from '@/config';
import { Post, Controller } from '@/decorator/index';
import response from '@/utils/response';
import { usePath } from '@/utils/usePath';
import fs, { mkdirSync } from 'fs';
import Joi from 'joi';
import { Context } from 'koa';
import path from 'path';
const { visitPath, tempPath, IP, } = usePath()
@Controller('/api/upload')
export default class uploadController {


  @Post("", '上传文件')
  /** */
  async postFn(ctx: Context) {
    const schema = Joi.object({
      file: Joi.required()
    })
    const { error, value: { file } } = schema.validate(ctx.request.files)
    if (error) return response.error(ctx, error.message)
    const accessPath = file.path.split('\\').pop()
    return response.success(ctx, visitPath + accessPath)
  }


  @Post("/slice", '切片上传')
  /** */
  async sliceFn(ctx: Context) {
    const schema = Joi.object({
      file: Joi.required()
    })
    const { error, value: { file } } = schema.validate(ctx.request.files)

    if (error) return response.error(ctx, error.message)

    // [ fileName, index, ext ] - 分割文件名  上传的文件名以 fileName.index.ext 形式上传
    const [fileName, index, ext] = file.name.split('.')

    // 将切片的文件上传到临时目录中
    const sliceDir = tempPath + fileName

    if (!fs.existsSync(sliceDir)) fs.mkdirSync(sliceDir)

    // 将分片文件从 temp 中移动到本次上传大文件的临时目录
    fs.renameSync(file.path, `${sliceDir}/${index}`)//可以将图片默认上传位置移动到你想存放的位置，可以减少文件数量

    return response.success(ctx, '文件上传成功')

  }



  @Post("/merge", '合并切片上传的文件')
  /** */
  async merge(ctx: Context) {

    const schema = Joi.object({
      name: Joi.string().required()
    })
    const { error, value: { name } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)

    const fname = name.split('.')[0]

    // 切片文件保存地址
    const sliceDir = tempPath + fname  // public/temp/${filename}

    // 获取所有切片文件
    const chunks = fs.readdirSync(sliceDir)

    chunks.sort((a, b) => +a - +b) // 排序一下  防止意外事件

    // 文件最终保存的文件夹
    const filePath = path.join(__dirname, `../public/files/`)
    if (!fs.existsSync(filePath)) mkdirSync(filePath)

    // 合并文件
    chunks.map(path => {
      const content = fs.readFileSync(`${sliceDir}/${path}`)
      fs.appendFileSync(`${filePath}/${name}`, content)
    })

    // 删除切片临时文件夹
    fs.rmSync(sliceDir, { recursive: true, })


    return response.success(ctx, `${IP}:${config.server.port}/files/${name}`)

  }








}
