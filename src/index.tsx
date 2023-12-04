import "driver.js/dist/driver.css";
import 'mini.css/dist/mini-default.css'
import './styles/main.less'
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './app'
import { store } from './store'

const root = createRoot(document.getElementById('app'))

root.render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
)
