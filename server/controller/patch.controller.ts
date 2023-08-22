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
    const out = []
    const num = 5
    while (out.length < num) {
      const temp = (Math.random() * files.length) >> 0
      out.push(files.splice(temp, 1).toString())
    }

    return response.success(ctx, out)
  }

  @Get('/patchBook')
  async patchBook(ctx: Context) {
    const content = await patchService.getHTML('https://m.biqubao8.com/book/108395/index_5.html')
    const $ = cheerio.load(content)
    const contents = []
    $('.chapter > li').each((i, e) => {
      const res = $(e).children('a')
      contents.push({
        text: res.text(),
        attr: res.attr('href')
      })
    })

    // console.log(`contents ==>`, contents)
    let arr = []
    const url = 'https://m.biqubao8.com'
    for (const item of contents) {
      console.log(`item ==>`, item)
      console.log(` ==>`, `${url}${item.attr}.html`)
      const start = item.attr.split('/').pop().split('.')[0]
      const HTML1 = await patchService.getHTML(`${url}${start}.html`)
      console.log(`HTML1 ==>`, HTML1)
      const HTML2 = await patchService.getHTML(`${url}${start}_2.html`)
      const HTML3 = await patchService.getHTML(`${url}${start}_3.html`)
      const str1 = cheerio.load(HTML1)('#nr1').text().toString().split('。')
      const str2 = cheerio.load(HTML2)('#nr1').text().toString().split('。')
      const str3 = cheerio.load(HTML3)('#nr1').text().toString().split('。')
      const obj = {
        title: item.title,
        data: str1.concat(str2).concat(str3)
      }
      console.log(`obj ==>`, obj)
      arr.push(obj)
    }
    return response.success(ctx, contents)
  }
}
