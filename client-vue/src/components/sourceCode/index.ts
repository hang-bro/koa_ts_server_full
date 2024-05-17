import { createVNode, render, createApp } from 'vue'
import Index from './index.vue'
import { ElDialog } from 'element-plus'

export type IDialogProps = InstanceType<typeof ElDialog>['$props']

/**
 * 查看源代码
 * @param codePath
 *
 */
export const showSourceCode = async (codePath: string, dialogProps: IDialogProps = {}) => {
  const excuteFn = () => {
    const vNode = createVNode(Index)
    render(vNode, document.body)
    const { open, close } = vNode.component?.exposed
    open(codePath, dialogProps)
  }
  try {
    excuteFn()
  } catch (error) {
    console.log(`error ==>`, error)
    excuteFn()
  }
}
