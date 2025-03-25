import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './components/Home'  // Componente de Login
import PublicPage from './components/PublicPage'  // Página pública
import PrivatePage from './components/PrivatePage' // Página privada
import PrivateRoute from './components/PrivateRoute' // RotaPrivada
import './App.css'

function App() {
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />  {/* Página de login */}
      <Route path="/publica" element={<PublicPage />} />  Página pública
      <Route
        path="/privada"
        element={
          <PrivateRoute>
            <PrivatePage />  {/* Página privada que requer login */}
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
  )
}

export default App
