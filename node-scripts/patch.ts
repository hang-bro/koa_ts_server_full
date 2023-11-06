import axios from 'axios'
import cheerio from 'cheerio'
const url = 'https://labola.jp/facility/page/'
let index = 1
let totalPage = 0

const imgUrls = []

/**获取分页总数 */
async function getTotalPage() {
  const { data } = await axios.get('https://labola.jp/facility', { responseType: 'text', timeout: 10000 }).catch(e => e)
  const $ = cheerio.load(data)
  // totalPage = + $('#page').children('ul').children().last().prev().children('a').html()
  totalPage = 1
}
async function main() {
  if (index > totalPage) return

  const { data } = await axios
    .get(url + index, { responseType: 'text', timeout: 10000 }) 
    .catch(e => e)

  const $ = cheerio.load(data)

  const hrefs = []
  $('.photo-list > li').each((i, el) => {
    const href = $(el).children().last().children('h3').children('a').attr('href')
    hrefs.push(href)
  })

  for (const item of hrefs) {
    const { data } = await axios.get(item)
    const $ = cheerio.load(data)
    $('#show_pictures')
      .children()
      .each((i, el) => {
        const href = $(el).attr('href')
        console.log(`href ==>`, href)
        imgUrls.push(href)
      })
  }
  index += 1
  await main()
}

getTotalPage().then(() => {
  main()
    .then(() => {
      console.log(`imgUrls ==>`, imgUrls);
    })
})
