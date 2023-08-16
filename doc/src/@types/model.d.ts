/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-05 16:47:20
 */

declare global {
  interface UserModel {
    id: string
    email: string
    username: string
    address: string
    avatar: string
    /**角色 */
    role: string
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

interface CatInfo {
  age: number
  breed: string
}

type CatName = 'mincat' | 'licat' | 'mordred'

const cats: Record<CatName, CatInfo> = {
  w: { dd: 6 },
}

cats.licat

const cats: Record<CatName, CatInfo>
