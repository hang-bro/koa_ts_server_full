

/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-29 10:33:32
 */
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { reduxActions, useAppDispatch, useAppSelector } from '@/store';
import { useLocation, } from 'react-router-dom'


export const useCss = () => {
  const useDispatch = useAppDispatch()
  useEffect(() => {
    const scss = import.meta.glob('@/views/css/**/*.scss', { eager: true, as: 'raw' })
    const tsx = import.meta.glob('@/views/css/**/*.tsx', { eager: true, as: 'raw' })
    const scssArr = []
    const tsxArr = []
    for (const item in scss) {
      const name = item.split('/').slice(0, -1).pop() as string
      const value = scss[item]
      scssArr.push({ [name]: value, path: item })
    }
    for (const item in tsx) {
      const name = item.split('/').slice(0, -1).pop() as string
      const value = tsx[item]
      tsxArr.push({ [name]: value, path: item })
    }
    useDispatch(reduxActions.setScss(scssArr))
    useDispatch(reduxActions.setTsx(tsxArr))

  }, [])
}


export const useCssData = () => {
  const { pathname } = useLocation()
  const { scss, tsx } = useAppSelector(state => state)
  const name = pathname.split('/').pop() as string
  const tsxContent = tsx.find(item => name in item)
  const scssContent = scss.find(item => name in item)


  const contents = [
    {
      tabs: 'typescript',
      lang: 'typescript',
      content: tsxContent[name]
    },
    {
      tabs: 'scss',
      lang: 'scss',
      content: scssContent[name]
    },
  ]
  return {
    tsxContent: tsxContent[name],
    scssContent: scssContent[name],
    contents
  }

}

