import 'animate.css'
import 'intro.js/introjs.css' // intro.js的基础样式文件
import '@/assets/css/base.css'
import '@/assets/css/custom.scss'
import '@/assets/css-icon/iconfont.css'

import 'virtual:svg-icons-register' //不引入不能生效
import dayjs from '@/utils/dayjs'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { App, Plugin } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { showSourceCode } from '@/components/sourceCode/index'

/**重置表单 */
export const resetForm = (formEl: FormInstance | undefined, cb?: Function) => {
  if (formEl) {
    formEl.resetFields()
    cb && cb()
  }
}

const plugins = {
  dayjs,
  Message: ElMessage,
  showSourceCode: showSourceCode,
  resetForm,
}

/**全局注入相关内容  如:注册指令 */
const globalInject: Plugin = {
  install: function (app: App<Element>) {
    /** */
    app.use(autoAnimatePlugin)
    app.config.globalProperties.Message = ElMessage

    Object.keys(plugins).forEach((key) => {
      /**
       * 挂载到window
       */
      window[key] = plugins[key]
      /**
       * 挂载在vue模板 templatezhong中
       */
      app.config.globalProperties[key] = plugins[key]
    })
  },
}

export default globalInject
