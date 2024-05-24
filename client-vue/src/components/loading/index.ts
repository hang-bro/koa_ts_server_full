import { createVNode, render, createApp } from 'vue'
import Index from './index.vue'

const modules = import.meta.glob('./**.vue')

const useLoading = async () => {
  const components: globalThis.Component[] = []
  // 循环进入路由
  for (let item in modules) {
    if (item != './index.vue') {
      const component = (await modules[item]?.()) as any
      if (component.default.name) components.push(component.default)
    }
  }
  // @ts-ignore
  return components.sort((a, b) => a.name.split('loading').pop() - b.name.split('loading').pop())
}

export default useLoading

/**查看图片 */
export const loading = async () => {
  const vNode = createVNode(Index)
  render(vNode, document.body)
  const { open, close } = vNode.component?.exposed as InstanceType<typeof Index>
  
  return {
    open,
    close,
  }
}
