/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-16 21:14:36
 */
import { Controller, Get, NoAuth, Post } from '@/decorator/index'
import patchService from '@/service/patch.service'
import { IDownloadFile } from '@/utils/downFileByCheeriio'
import response from '@/utils/response'
import cheerio from 'cheerio'
import Joi from 'joi'
import { Context } from 'koa'
import turndown from 'turndown'
const turndownService = new turndown()
// 添加Controller前缀
@Controller('/api/patch')
export default class AdminController {
  @Get()
  @Post('', '爬取文件')
  @NoAuth('/api/patch')
  async patch(ctx: Context) {
    // const schema = Joi.object({
    //   url: Joi.string().uri().required()
    // })
    // const {
    //   error,
    //   value: { url }
    // } = schema.validate(ctx.request.body)
    // if (error) return response.error(ctx, error.message)
    const HTML = await patchService.getHTML('https://wallhaven.cc/toplist?page=2')
    const $ = cheerio.load(HTML)
    let fileList: any = []
    $('.preview').each((i, e) => {
      fileList.push(e.attribs['href'])
    })

    const downloadUrls: IDownloadFile[] = []
    for (const url of fileList) {
      const html = await patchService.getHTML(url)
      const $$ = cheerio.load(html)
      // @ts-ignore
      $$('#wallpaper').each(async (i, e) => {
        const url = e.attribs.src
        const fileName = url.split('/').pop()!
        // console.log(`url==>`, url, fileName);
        downloadUrls.push({ url, fileName })
        await patchService.download({ url, fileName })
      })
    }
    return response.success(ctx, downloadUrls)
  }


}
