/*
 * @Description:按钮权限
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 16:22:16
 */
 import type { Directive, DirectiveBinding } from "vue";
import store from "@/store";
/**不需要权限的路由数组 */
// const noLimitRoutes=['/404','/500','/login','/index/usercenter/userdetails',"/index/usercenter/editUserInfo"]
// const allRoutes=store.state.users.leftbarMenu 
//     /**设置所有路由 */
// function getAllRoutes(routes: any) {
//       let urls: any = []
//       function getUrl(params: any) {
//         if (!params.children.length) {
//           urls.push(params.url)
//         } else {
//           for (const item of params.children) {
//             getUrl(item)
//           }
//         }
//       }
//       Object.keys(routes).forEach((key: string) => {
//         for (const item of routes[key]) {
//           getUrl(item)
//         }
//       })
//       return urls
//     }
// const urls = getAllRoutes(allRoutes) as Array<any>
// console.log(urls.includes(''));

 interface ElType extends HTMLElement {
   copyData: string | number;
   click: any;
 }
 interface bindingData{
   value:{
     current:any,
     all:any
   }
 }
   const auth: Directive = {
   mounted(el: ElType, binding: DirectiveBinding) {
     console.log(el,binding);
     //可以根据权限隐藏按钮
    //  el.style.display='none'

   },
   updated(el: ElType, binding: DirectiveBinding) {
     el.copyData = binding.value;
   },
   beforeUnmount(el: ElType) {
     el.removeEventListener("click", el.click);
   }
 };
 export default auth;
 