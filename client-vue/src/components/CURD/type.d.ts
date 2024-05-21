import { DatePickType, ElDatePicker, ElInput, ElSelect, ElForm } from 'element-plus'

type Value = string | number | null | any[]

export type IFormSize = InstanceType<typeof ElForm>['$props']['size']
/**
 * 处理数据
 * 如 options.type=='daterange'   value ===>['2024-05-10', '2024-06-20']
 * 处理成 ==> {startTime:'2024-05-10', endTime:'2024-06-20'}
 */
type FormateValue = (value: Value, form?: Record<string, Value>) => any

// 定义表单项类型
type Input = {
  type: 'input'
  label: string
  value: Value
  options?: InstanceType<typeof ElInput>['$props']
  formateValue?: FormateValue
  placeholder?: string
}

type Select = {
  type: 'select'
  label: string
  value: Value
  options: { label: string; value: any }[]
  options?: InstanceType<typeof ElSelect>['$props']
  formateValue?: FormateValue
  placeholder?: string
}

type Date = {
  /**
   * 日期选择 YYYY-MM-DD
   * 如: 2024-05-23
   */
  type: 'date'
  label: string
  value: Value
  options?: InstanceType<typeof ElDatePicker>['$props']
  formateValue?: FormateValue
  placeholder?: string
}

// 组件 props 类型
export interface SearchFormProps {
  [prop: string]: Input | Select | Date
}
