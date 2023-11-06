import userStore, { IUserStore } from '@/store/user'
import configStore, { IConfigStore } from '@/store/config'

const modules = import.meta.glob('../store/*', { eager: true })

type IStores = {
  user: IUserStore
  config: IConfigStore
}

const getStores = (): IStores => {
  return {
    user: userStore(),
    config: configStore(),
  }
}

export const useStore = <T>(selector: (store: IStores) => T) => {
  return selector(getStores())
}
