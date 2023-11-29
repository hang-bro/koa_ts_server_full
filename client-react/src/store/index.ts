/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-28 18:09:47
 */

import { createSlice, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import { useSelector, TypedUseSelectorHook, useDispatch, shallowEqual } from 'react-redux'
// import storage from 'redux-persist/lib/storage' //localStorage 
import storageSession from 'redux-persist/lib/storage/session' //sessionStorage

/**初始值 */
export interface IInitialState {
    /**登录状态 */
    loginStatus: boolean;
    /**是否折叠 */
    collapsed: boolean;
    /**主题 */
    theme: 'dark' | 'light';
    /**token */
    token: string
    /**userId */
    userId: string
    scss: any[]
    tsx: any[]
}

const initialState: IInitialState = {
    loginStatus: false,
    collapsed: false,
    theme: 'dark',
    token: '',
    userId: '',
    scss: [],
    tsx: [],
}

export const reducersSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        /**设置token */
        setToken: (state, action) => {
            state.token = action.payload;
        },
        /**设置id */
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        /**更改登录状态 */
        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
        /**更改菜单状态 */
        setCollapsed: (state, action) => {
            state.collapsed = action.payload;
        },
        /**更改主题 */
        setTheme: (state, action) => {
            state.theme = action.payload;
        },

        setScss: (state, action) => {
            state.scss = action.payload;
        },
        setTsx: (state, action) => {
            state.tsx = action.payload;
        },

    }
})

export const reduxActions = reducersSlice.actions;


// 这个是redux-persist 的配置，可以配置黑名单、白名单
const persistConfig = {
    key: 'root', // 自动框架生产的根目录id 是root。不变
    // storage: storage, // 这个是选择用什么存储，session 还是 storage
    storage: storageSession,
}

// 一个经过处理的reducer
export const persistedReducer = persistReducer(persistConfig, reducersSlice.reducer)

export const store = configureStore({
    reducer: persistedReducer,
    // 无法序列化
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// 获取值
export const useAppSelector: TypedUseSelectorHook<IInitialState> = useSelector

// 调用 dispatch 使用方法
export const useAppDispatch: () => typeof store.dispatch = useDispatch

export const persistedStore = persistStore(store)




