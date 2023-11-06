/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-28 20:11:15
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 数据持久化插件
import piniaPersist from 'pinia-plugin-persist'
import router from '@/router'
import App from '@/App.vue'
import directives from '@/directives'
import globalInject from '@/utils/globalInject'

const bootStrap = async () => {
  const pinia = createPinia().use(piniaPersist)

  const app = createApp(App)

  app
    .use(globalInject) /** */
    .use(directives)
    .use(router)
    .use(pinia)

  router.isReady().then(() => {
    document.getElementById('loading-mask').style.display = 'none'
    app.mount('#app')
  })
}

bootStrap()
