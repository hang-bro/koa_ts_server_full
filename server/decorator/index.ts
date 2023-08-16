interface IRequestMapping {
  url?: string
  method?: IMethod
  middleware?: any[]
  /**描述 */
  description?: string
}

interface IController {
  url: string
  method: IMethod
  /**描述 */
  description?: string
  middleware: any[]
  handler: any
  constructor: any
}

export const noTokenApis: string[] = []

/**
 * 请求方法
 */
export type IMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

/*
 * 定义注册的路由数组
 */
export const controllers: IController[] = []

/**
 * @description 给controller类添加路由前缀
 * @param prefix
 * @returns
 */
export function Controller(prefix = '') {
  return function (target: any) {
    target.prefix = prefix
    // console.log(`target`, target)
  }
}

/**
 * @description 给controller类添加详情信息
 * @param description
 * @returns
 */
export function Description(description = '') {
  return function (target: any) {
    target.description = description
  }
}

/**
 * 公共路由 (api) 无需token
 */
export function NoAuth(api: string) {
  return function (target: any, name: string) {
    if (noTokenApis.includes(api)) {
      console.log(`${target.constructor.name} api ==> "${api}" 重复,方法名称为${name}`)
    } else {
      noTokenApis.push(api)
    }
  }
}

/**
 * 给controller类的方法添加装饰
 * url 可选
 * method 请求方法
 * middleware 中间件
 */
export function RequestMapping(data: IRequestMapping) {
  const { url = '', method = 'get', middleware = [], description = '' } = data
  return function (target: any, name: string, descriptor: any) {
    let path
    // 判断有没有定义url
    if (url === '/') {
      // 取方法名作为路径
      path = `/${name}`
    } else {
      // 自己定义的url
      path = url
    }
    // 创建router需要的数据 url，method，middleware（可以没有）,最终执行的方法，装饰器队对象的构造函数
    const item = {
      url: path,
      method,
      middleware,
      handler: target[name],
      constructor: target.constructor,
      description
    }
    controllers.push(item)
  }
}

export function Get(url: string = '', description: string = '', middleware = []) {
  return RequestMapping({ url, method: 'get', description, middleware })
}

export function Post(url: string = '', description: string = '', middleware = []) {
  return RequestMapping({ url, method: 'post', description, middleware })
}

export function Put(url: string = '', description: string = '', middleware = []) {
  return RequestMapping({ url, method: 'put', description, middleware })
}

export function Delete(url: string = '', description: string = '', middleware = []) {
  return RequestMapping({ url, method: 'delete', description, middleware })
}

export function Patch(url: string = '', description: string = '') {
  return RequestMapping({ url, method: 'patch', description })
}
