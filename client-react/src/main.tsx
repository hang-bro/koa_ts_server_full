/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-29 17:24:52
 */
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { globalInject } from '@/utils/globalInject'
import { persistedStore, store } from '@/store'
import App from './App'

globalInject()
  .then(() => {
    ReactDOM
      .createRoot(document.getElementById('root')!)
      .render(
        <HashRouter>
          <Provider store={store}>
            <PersistGate persistor={persistedStore}>
              <App />
            </PersistGate>
          </Provider>
        </HashRouter>
      )

  })
