/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 11:18:15
 */

import { Get, Post, Controller } from '@/decorator/index'
import onlineEditorService from '@/service/onlineEditor.service'
import { generateDirTree } from '@/utils/generateTree'
import response from '@/utils/response'

import fs from 'fs'
import hljs from 'highlight.js'
import { Context } from 'koa'
import mime from 'mime'

@Controller('/api/onlineEditor')
export default class onlineEditorController {
  @Get('/project', '获取项目列表')
  /** */
  async getProjectList(ctx: Context) {
    return response.success(ctx, await onlineEditorService.getProjectList())
  }

  @Post('/projectTree', '打开某个项目的文件夹  获取文件树')
  /** */
  async projectTree(ctx: Context) {
    const { path } = ctx.request.body

    if (!path) return response.error(ctx, '请传入参数')

    if (!fs.existsSync(path)) return response.error(ctx, '文件不存在')

    return response.success(ctx, await onlineEditorService.generateTree(path))
  }

  @Post('/getFile', '读取文件  hljs返回')
  /** */
  async getFile(ctx: Context) {
    const { path } = ctx.request?.body

    if (!path) return response.error(ctx, '请传入参数')
    if (!fs.existsSync(path)) return response.error(ctx, '文件不存在')


    const type = mime.getType(path)
    const content = fs.readFileSync(path)
    const fileSize = content.length / 1024 / 1024 // MB


    /**
     * 图片资源
     */
    if (type && type.includes('image/')) {

      if (fileSize >= 3) return response.success(ctx,await onlineEditorService.fileOverSize(path))

      return response.success(ctx, await onlineEditorService.generateImg(path, type))
    }
    
    /**
     * 文件资源
     */
    if (fileSize >= 0.1) return response.success(ctx,await onlineEditorService.fileOverSize(path))

    return response.success(ctx, hljs.highlightAuto(content.toString()).value)
  }
}
