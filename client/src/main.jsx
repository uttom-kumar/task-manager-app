import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import './assets/progress.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import store from "./redux/store/store.js";
import {Toaster} from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
      <App />
    </Provider>
  </StrictMode>,
)
