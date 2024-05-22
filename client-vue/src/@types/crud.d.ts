import { DatePickType, ElDatePicker, ElInput, ElSelect, ElForm } from 'element-plus'

import Crud from '@/components/Crud/index.vue'

type Value = string | number | null | any[]

/**
 * 处理数据
 * 如 options.type=='daterange'   value ===>['2024-05-10', '2024-06-20']
 * 处理成 ==> {startTime:'2024-05-10', endTime:'2024-06-20'}
 */
type IFormateValue = (value: Value, form?: Record<string, Value>) => any

// 定义表单项类型
type IInput = {
  type: 'input'
  label: string
  value: Value
  props?: InstanceType<typeof ElInput>['$props']
  formateValue?: IFormateValue
  placeholder?: string
}

type ISelect = {
  type: 'select'
  label: string
  value: Value
  options: { label: string; value: any }[]
  props?: InstanceType<typeof ElSelect>['$props']
  formateValue?: IFormateValue
  placeholder?: string
}

type IDate = {
  /**
   * 日期选择 YYYY-MM-DD
   * 如: 2024-05-23
   */
  type: 'date'
  label: string
  value: Value
  props?: InstanceType<typeof ElDatePicker>['$props']
  formateValue?: IFormateValue
  placeholder?: string
}

declare global {
  type ICrudProps = InstanceType<typeof Crud>['$props']
  type ISearchFormSize = InstanceType<typeof ElForm>['$props']['size']
  /**
   * searchForm 示例
   *  ``` js
   * const searchForm = reactive<ISearchForm>({
   *  name: { type: 'input', label: '名称', value: null },
   *  remark: { type: 'input', label: '备注', value: null },
   *  select: {
   *    type: 'select',
   *    label: '选择',
   *    value: null,
   *    options: [
   *      {
   *        label: '1',
   *        value: 1,
   *      },
   *      {
   *        label: '2',
   *        value: 2,
   *      },
   *    ],
   *  },
   *  date: {
   *    type: 'date',
   *    label: '日期',
   *    props: {
   *      type: 'daterange',
   *    },
   *    value: [],
   *    formateValue: (value, form) => {
   *      form.startTime = value[0]
   *      form.endTime = value[1]
   *    },
   *  },
   * })
   * ```
   */
  interface ISearchForm {
    [prop: string]: IInput | ISelect | IDate
  }
}

export {}
