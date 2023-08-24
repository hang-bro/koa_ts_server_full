/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-25 14:51:43
 */
import 'zx/globals'
import { usePath } from './server/utils/usePath'
const { controller, service } = usePath()
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
        error(input + ' (controller/service) 已存在!\n')
        return main()
      } else {
        const template = createTemplate(input)
        writeFile(template, input)
        console.log(`创建成功`)
        console.log(`${service}/${input}.service.ts`)
        console.log(`${controller}/${input}.controller.ts`)
      }
    }
  })
}

const checkFileExits = (name: string) =>
  fs.existsSync(`${service}/${name}.service.ts`) ||
  fs.existsSync(`${controller}/${name}.controller.ts`)

const createTemplate = (inputName: string) => {
  const controllerTemplate = `
  import { Context } from 'koa'
  import joi from 'joi'
  import { Delete, Get, Post, Controller, Put } from '@/decorator/index'
  import response from '@/utils/response'
  import { useQuery } from '@/utils/useQuery'
  import ${inputName}Service from '@/service/${inputName}.service'
  
  @Controller('/api/${inputName}')
  export default class ${inputName}Controller {
  
    @Get('', '获取${inputName}')
    /**获取${inputName} */
    async get(ctx: Context) {

      return response.page(ctx, await ${inputName}Service.getList(useQuery(ctx)))

    }

    @Get('/noPage', '获取${inputName}不分页')
    /**获取${inputName}不分页 */
    async noPage(ctx: Context) {

      return response.success(ctx, await ${inputName}Service.noPage())

    }

    @Post('/queryById', '查询某个${inputName}')
     /**查询某个${inputName} */
     async queryById(ctx: Context) {
       const schema = joi.object({
         id: joi.string().required()
       })
       const {
         error,
         value: { id }
       } = schema.validate(ctx.request.body)
     
       if (error) return response.error(ctx, error.message)
     
       const data = await ${inputName}Service.queryById(id)
     
       if (!data) return response.error(ctx, '${inputName}不存在!')
     
       return response.success(ctx,data)
     }

    @Post('', '新增${inputName}')
    /**新增${inputName} */
    async add(ctx: Context) {

      const schema = joi.object({})

      const { error, value } = schema.validate(ctx.request.body)

      if (error) return response.error(ctx, error.message)
  
      return response.success(ctx, await ${inputName}Service.add(value))
    }


    @Delete('/:ids', '删除${inputName}')
    /**删除${inputName} */
    async del(ctx: Context) {
      const schema = joi.object({
        ids: joi.string().required()
      })
      const {
        error,
        value: { ids }
      } = schema.validate(ctx.params)

      if (error) return response.error(ctx, error.message)

      const flag = await ${inputName}Service.del(ids)

      if (flag) return response.success(ctx)

      return response.error(ctx, '${inputName}不存在')
    }


    
  @Put('', '修改${inputName}')
  /**修改${inputName} */
  async edit(ctx: Context) {

    const { error } = await ${inputName}Service.edit(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    return response.success(ctx)
  }
  }`

  const serviceTemplate = `
  import { IQuery } from '@/utils/useQuery'
  import prisma from "@/utils/prismaClient"
  import { dbLogger } from '@/logger'

  class ${inputName}Service {
    /**查询 */
    async getList(data: IQuery) {
      const { page, query } = data
      try {
        const data = await prisma.${inputName}.findMany({ ...page, ...query })
  
        const total = await prisma.${inputName}.count(query)
  
        return { data, total }
      } catch (error) {
        console.log('error.message ==>', error.message)
        dbLogger.error(error.message)
      }
    }
  
    /**获取用户不分页 */
    async noPage() {
      return await prisma.${inputName}.findMany()
    }
  

    async queryById(id: string | number) {

      return await prisma.${inputName}.findUnique({ where: { id } })

    }
   
  
    /**新增 */
    async add(data: any) {
      return await prisma.${inputName}.create({
        data:data
      })
    }
  
    /**删除 */
    async del(ids: string) {
      try {
        for (const id of ids.split(',')) {
          await prisma.${inputName}.delete({ where: { id } })
        }
        return true
      } catch (error) {}
    }
  
    /**修改 */
    async edit(data: any) {
  
      try {
        await prisma.role.update({
          where: { id: data.id },
          data
        })
        return {}
      } catch (error) {
        return { error: error as Error }
      }
    }
  }
  export default  new ${inputName}Service()
  `
  return {
    serviceTemplate,
    controllerTemplate
  }
}

const writeFile = (template: any, fileName: string) => {
  const { serviceTemplate, controllerTemplate } = template
  const controllerPath = controller + `/${fileName}.controller.ts`
  const serviccePath = service + `/${fileName}.service.ts`
  fs.writeFileSync(controllerPath, controllerTemplate)
  fs.writeFileSync(serviccePath, serviceTemplate)
}

main()
