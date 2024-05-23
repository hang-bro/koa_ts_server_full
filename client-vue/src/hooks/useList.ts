/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 15:08:56
 */

import { http } from '@/http'
import { FormInstance } from 'element-plus'

export type IQuery = {
  /**id */
  id?: string | number
  /**关键词 */
  keywords?: string
  [props: string]: any
}

export default function useList<T extends any = any>(url: string, searchForm?: ISearchForm) {
  /**数据列表 */
  const list = ref<T>()

  /**选中的表格项目 */
  const tableCheck = ref([])

  /**是否显示搜索 */
  const showSearch = ref(true)

  /**加载态 */
  const loading = ref(false)

  /**总数量 */
  const total = ref(0)

  /**当前页 */
  const pageIndex = ref(1)

  /**分页大小 */
  const pageSize = ref(10)

  const toQueryForm = () => {
    const form = {}
    Object.keys(searchForm).forEach((key) => {
      const type = searchForm[key].type
      if (searchForm[key].formateValue) {
        /**判断自定义修改绑定的值 */
        if (type == 'date') {
          searchForm[key].formateValue(searchForm[key].value, form)
        } else {
          form[key] = searchForm[key].formateValue(searchForm[key].value)
        }
      } /**直接赋值 */ else {
        form[key] = searchForm[key].value
      }
    })

    return form
  }

  const getList = () => {
    loading.value = true

    const params = { pageSize: pageSize.value, pageIndex: pageIndex.value, ...toQueryForm() }

    return new Promise<void>((resolve) => {
      http
        .get<{ rows: any[]; total: number }>(url, params)
        .then((res) => {
          list.value = (res.data.rows as unknown as any) || []
          total.value = res.data.total || 0
          resolve()
        })
        .finally(() => (loading.value = false))
    })
  }

  const reset = (formEl: FormInstance | undefined, cb?: Function) => {
    if (formEl) {
      formEl.resetFields()
      cb && cb()
    }
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
    getList,
    reset,
  }
}
