import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './modules/auth/LoginPage.jsx'
import AdministradorPage from './modules/administrador/AdministradorPage.jsx'
import GuardaPage from './modules/guarda/GuardaPage.jsx'
import Navbar from './components/Navbar.jsx'
import { AppProvider } from './context/Context.jsx'
import Protected from './hook/Protected.jsx'
import ParqueoForm from './modules/administrador/ParqueoForm.jsx'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Navbar> <LoginPage /></Navbar>} />
          <Route element={<Protected />}>
            <Route path='/guarda' element={<Navbar><GuardaPage /></Navbar>} />
            <Route path='/administrador' element={<Navbar><AdministradorPage /></Navbar>} />
            <Route path='/update-parqueo/:id' element={<Navbar><ParqueoForm /></Navbar>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
