import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './main.css'
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';



ReactDOM.createRoot(document.getElementById('root')!).render(

  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
)
