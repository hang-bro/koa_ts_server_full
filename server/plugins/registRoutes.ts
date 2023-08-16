/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-11 09:07:13
 */
import Koa from "koa";
import path from "path";
import fs from "fs";
import Router from "koa-router";
import { controllers } from '@/decorator';

/**引入 controller 并注册路由 */
export const registRoutes = async (app: Koa, router: Router): Promise<void> => {

  const controllerPath = path.join(__dirname, '../controller')

  const files = fs.readdirSync(controllerPath); //将当前目录下 都读出来

  files.map((file) => require(`${controllerPath}/${file}`))

  console.log(`controller 引入完成!`,);
  
  // 引入完成之后再注册路由 才能将装饰器注入
  controllers.forEach((item) => {
    // 获取每个路由的前缀
    const prefix = item.constructor.prefix;
    let url = item.url;
    if (prefix) url = `${prefix}${url}`; // 组合真正链接
    router[item.method](url, ...item.middleware, item.handler); // 创建路由
  });

  app
    .use(router.routes())
    .use(router.allowedMethods()) // 路由装箱
  //引入所有类，执行装饰器，这时router挂满配置信息，返回router,调用时用的是这个挂有配置信息的router
}




