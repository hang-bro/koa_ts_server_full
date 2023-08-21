import { readdirSync } from 'fs'
/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-08-21 19:34:55
 */
import { Controller, Get, NoAuth, Post } from '@/decorator/index'
import patchService from '@/service/patch.service'
import { IDownloadFile } from '@/utils/downFileByCheeriio'
import response from '@/utils/response'
import cheerio from 'cheerio'
import Joi from 'joi'
import { Context } from 'koa'
import turndown from 'turndown'
import { join } from 'path'
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
    const HTML = await patchService.getHTML('https://wallhaven.cc/toplist?page=5')
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
  @Get('/patchList')
  @NoAuth('/api/patchList')
  async patchList(ctx: Context) {
    const files = readdirSync(join(__dirname, '../public/download/hotPic'))
    return response.success(ctx,files)
  }

  @Get('/patchBook')
  async patchBook(ctx: Context) {
    const { url, start } = ctx.query
    let arr = []
    const HTML1 = await patchService.getHTML(`${url}/${start}.html`)
    const HTML2 = await patchService.getHTML(`${url}/${start}_2.html`)
    const HTML3 = await patchService.getHTML(`${url}/${start}_3.html`)
    const str1 = cheerio.load(HTML1)('#nr1').text().toString().split('。')
    const str2 = cheerio.load(HTML2)('#nr1').text().toString().split('。')
    const str3 = cheerio.load(HTML3)('#nr1').text().toString().split('。')

    return response.success(ctx, arr.concat(str1).concat(str2).concat(str3))
  }
}
