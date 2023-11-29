/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 15:08:56
 */

import { http } from '@/http'

export type IQuery = {
  /**id */
  id?: string | number
  /**关键词 */
  keywords?: string
  [props: string]: any
}

export default function useList<T>(url: string) {
  /**数据列表 */
  const list = ref<T>()

  /**选中的表格项目 */
  const tableCheck = ref([])

  /**是否显示搜索 */
  const showSearch = ref(true)

  /**加载态 */
  const loading = ref(false)

  const query = reactive<IQuery>({})

  /**总数量 */
  const total = ref(0)

  /**当前页 */
  const pageIndex = ref(1)

  /**分页大小 */
  const pageSize = ref(10)

  const getList = () => {
    loading.value = true
    const data = { pageSize: pageSize.value, pageIndex: pageIndex.value, ...query }
    const params = JSON.parse(JSON.stringify(data))

    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key]
    })

    return new Promise<void>((resolve) => {
      http
        .get<T>(url, params)
        .then((res) => {
          list.value = res.data || ([] as T)
          total.value = res.total || 0
          resolve()
        })
        .finally(() => (loading.value = false))
    })
  }
  const reset = () => {
    Object.keys(query).forEach((key) => (query[key] = ''))
    getList()
  }

  watch([pageSize, pageIndex], async () => {
    await getList()
  })

  return {
    list,
    loading,
    showSearch,
    pageIndex,
    total,
    pageSize,
    tableCheck,
    query,
    getList,
    reset,
  }
}
