/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-10 17:52:14
 */
import type { IHttp } from '@/http/index'
import type { IDayJs } from '@/utils/dayjs'
import Svg from '@/components/Svg/index.vue'
import CURD from '@/components/CURD/index.vue'
import Copy from '@/components/Copy/index.vue'
import ScrollBox from '@/components/ScrollBox/index.vue'
import { showSourceCode } from '../components/sourceCode/index'
import ImageUpload from '@/components/ImageUpload/index.vue'
import { ElMessage } from 'element-plus'
import { resetForm as ResetForm } from '../utils/globalInject'

declare global {
  /**注意 定义Window接口 首字母一定要大写 否则会出问题 */
  interface Window {
    dayjs: IDayJs
  }

  const dayjs: IDayJs
  const Message: typeof ElMessage
  const showSourceCode: typeof showSourceCode
  const resetForm: typeof ResetForm
}

declare module 'vue' {
  /**自定义在 .vue文件中的全局属性 */
  interface ComponentCustomProperties {
    /**app相关属性 */
    dayjs: IDayJs
    Svg: typeof Svg
    CURD: typeof CURD
    Copy: typeof Copy
    ScrollBox: typeof ScrollBox
    ImageUpload: typeof ImageUpload
    Message: typeof ElMessage
    showSourceCode: typeof showSourceCode
    resetForm: typeof resetForm
  }
}

export {}
