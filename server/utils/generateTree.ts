/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-27 14:45:54
 */
import fs from "fs";
import path from "path";


/**
 * @description 创建文件树   （本地环境某个文件地址下的所有文件生成树结构）
 * @param path 目录地址
 * @param excepts 排除那些文件 
 * @returns 
 */
export function generateDirTree(path: string, excepts?: string[]): any {
  const exceptNames = excepts || ['node_modules', '.git',]
  const flag = exceptNames?.filter(item => path.includes(item))?.length == 0
  if (flag) {
    const files = fs.readdirSync(path);
    const tree = [];
    for (const file of files) {
      // 文件路径
      const filePath = `${path}/${file}`
      const stats = fs.statSync(`${path}/${file}`);
      if (stats.isDirectory()) {
        tree.push({
          value: filePath,
          key: filePath,
          type: 'dir',
          name: file,
          title: file,
          children: generateDirTree(filePath)
        });
      } else {
        tree.push({
          value: filePath,
          key: filePath,
          type: 'file',
          title: file,
          size: `${(stats.size / 1024).toFixed(2)}Kb`,
          name: file,
          children: null
        });
      }
    }
    tree.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      } else {
        return a.type === 'dir' ? -1 : 1;
      }
    })

    return tree.filter(item => !exceptNames.includes(item.name))
  }






}

