import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from "react-redux"
import store from './store/store.js'

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

const persister = persistStore(store)

if (import.meta.env.VITE_MODE === 'production') {
  disableReactDevTools();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
