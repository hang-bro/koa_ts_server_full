/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-25 14:51:43
 */
import 'zx/globals'
/**
 * 前端视图路径
 */
const frontPath = path.join(__dirname, './doc/src/views')

const error = (msg: string) => console.log(chalk.bold.bgRed(msg))
/**是否包含中文字符 */
const regCn = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
/**是否是正常的文件名称 */
const regFileName = new RegExp('[\\\\/:*?"<>|]')

/**获取正确的输入值 */
const main = () => {
  question(chalk.bold.cyan('请输入名称:\n')).then(async input => {
    if (regCn.test(input) || regFileName.test(input)) {
      error('请输入不包含中文,特殊字符的名称\n')
      return main()
    } else {
      const fileExist = checkFileExits(input)
      if (fileExist) {
        error(input + '已存在!\n')
        return main()
      } else {
        const template = createTemplate(input)
        writeFile(input, template)
      }
    }
  })
}

const checkFileExits = (name: string) => fs.existsSync(`${frontPath}/${name}`)

/**
 *
 * @param dirName 文件夹名称
 * @returns
 */
const createTemplate = (dirName: string) => {
  const template = `
  <template>
    <main class="w-full h-full p-5">
        ${dirName}
    </main>
  </template>
  <script lang="ts" setup>
  import { http } from '@/http'

  </script>
  <style lang="scss" scoped>

  </style>
`

  return template
}

const writeFile = (dirName: string, tempate: string) => {
  fs.mkdirSync(`${frontPath}/${dirName}`)

  const vuePath = `${frontPath}/${dirName}/index.vue`

  fs.writeFileSync(vuePath, tempate)
  console.log(`创建成功`, vuePath)
}

main()
