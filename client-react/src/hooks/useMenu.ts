/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-29 11:35:32
 */
import routes from '@/router'
import type { MenuProps } from 'antd'
type MenuItem = Required<MenuProps>['items'][number]

function getMenuTree(menuData: any[],): MenuItem[] {
  const tree: any[] = [];
  menuData.forEach(item => {
    const title = item?.meta?.title
    const path = item.path as string
    const label = title ? title : path
    if (item.children && item.children.length) {
      tree.push({
        ...item,
        label,
        key: path,
        children: getMenuTree(item.children)
      });
    } else {
      if (path !== '' && !path.startsWith('/') && path !== 'login') {
        const parent = item?.meta?.parent
        const key = () => {
          if (parent) {
            return `${parent}/${path}`
          }
          return path
        }
        tree.push({
          ...item,
          label,
          key: key(),
        });
      }
    }
  });
  return tree
}


export const useMenu = () => getMenuTree(routes)
