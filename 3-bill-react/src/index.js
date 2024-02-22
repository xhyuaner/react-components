import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App'
import router from "./router"
import {Provider} from 'react-redux'
import store from './store'
// 导入定制主题文件
import './theme.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)

