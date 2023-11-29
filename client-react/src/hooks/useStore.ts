/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-15 17:56:50
 */
import { useSelector } from "react-redux";
import { IInitialState } from "@/store";

/**获取数据 */
export const useStore = <T>(key: keyof IInitialState) => {
  return useSelector((state: IInitialState) => state[key] as T);
}
