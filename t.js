const str = `{
  /**路由参数*/
  routeParam:"路由参数",

  /**是否缓存*/
  isCache:"是否缓存",

  /**显示状态*/
  showStatus:"显示状态"
}`;

const cleaned = str.replace(/\/\*\*[\s\S]*?\*\//g, ''); 
// console.log(`cleaned ==>`,cleaned);
const res = eval(`(()=>{const obj=${cleaned};return obj;})()`)
console.log(`res ==>`,res);

