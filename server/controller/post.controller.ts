
  import { Context } from 'koa'
  import joi from 'joi'
  import { Delete, Get, Post, Controller, Put } from '@/decorator/index'
  import response from '@/utils/response'
  import { useQuery } from '@/utils/useQuery'
  import postService from '@/service/post.service'
  
  @Controller('/api/post')
  export default class postController {
  
    @Get('', '获取post')
    /**获取post */
    async get(ctx: Context) {

      return response.page(ctx, await postService.getList(useQuery(ctx)))

    }

    @Get('/noPage', '获取post不分页')
    /**获取post不分页 */
    async noPage(ctx: Context) {

      return response.success(ctx, await postService.noPage())

    }

    @Post('', '新增post')
    /**新增post */
    async add(ctx: Context) {

      const schema = joi.object({})

      const { error, value } = schema.validate(ctx.request.body)

      if (error) return response.error(ctx, error.message)
  
      return response.success(ctx, await postService.add(value))
    }


    @Delete('/:ids', '删除post')
    /**删除post */
    async del(ctx: Context) {
      const schema = joi.object({
        ids: joi.string().required()
      })
      const {
        error,
        value: { ids }
      } = schema.validate(ctx.params)

      if (error) return response.error(ctx, error.message)

      const flag = await postService.del(ids)

      if (flag) return response.success(ctx)

      return response.error(ctx, 'post不存在')
    }


    
  @Put('', '修改post')
  /**修改post */
  async edit(ctx: Context) {

    const schema = joi.object({})

    const { error, value } = schema.validate(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    const flag = await postService.edit(value)

    if (!flag) return response.error(ctx, 'post不存在')

    return response.success(ctx)
  }
  }