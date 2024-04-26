import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { router } from "./router";
import store from './store';
const persistor = persistStore(store)


function App() {

  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>

        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />

      </PersistGate>
    </Provider>

  )
}

export default App
