/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-05 16:47:20
 */
declare global {
  /**
   * 需要分页返回数据
   * */
  type IPage<T extends any = any> = {
    rows: T[]
    total: number
  }

  /**
   * 查询参数
   */
  type IQueryParams<T extends any = {}> = {
    /**
     * 第几页
     */
    pageIndex: number
    /**
     * 分页大小
     */
    pageSize: number
  } & {
    [P in keyof T]?: string | number | null
  }

  /**
   * 公共状态
   * @type {T} tableCheck tableData 对应的类型
   */
  type ICommonState<T extends any = any> = {
    /**api地址 */
    api?: string

    /**是否显示搜索 */
    showSearch?: boolean
    /**表格总数 */
    total?: number
    /**表格数据 */
    tableData: T[]
    /**表格选中项 */
    tableCheck: T[]

    /***
     * 可扩展
     *
     */
    [props: string]: any
  }

  interface IUser {
    id: string
    email: string
    age: number
    username: string
    address: string
    avatar: string
    createdAt: string
    updatedAt: string
    roleId?: any
  }

  interface RoleModel {
    id?: string
    name: string
    key: string
    sort: number
    remark: string
  }
}
export {}
