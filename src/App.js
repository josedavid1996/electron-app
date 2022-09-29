import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import { RouteInicio } from './routes/RouteInicio'
import { RouteTaquilla } from './routes/RouteTaquilla'
import { RouteAcientos } from './routes/RouteAcientos'
import { RouteUsuario } from './routes/RouteUsuario'
import { Eyes } from './components/Eyes'
import { AppContext } from './context'
import { useState } from 'react'
import { w3cwebsocket } from 'websocket'

function App() {
  const [usuarioHidden, setUsuarioHidden] = useState(false)
  const [vistaUsuario, setVistaUsuario] = useState('inicio')
  const [eyesHidden, setEyesHidden] = useState(true)

  let client = new w3cwebsocket('ws://localhost:8080/', 'echo-protocol')

  const mandarInformacion = function () {
    client.send(eyesHidden ? false : true)
    setUsuarioHidden(!usuarioHidden)
  }
  client.onmessage = function (e) {
    // setEyesHidden(JSON.parse(e.data))
    if (JSON.parse(e.data) === 'true') {
      setEyesHidden(true)
    }
    if (JSON.parse(e.data) === 'false') {
      setEyesHidden(false)
    }
  }
  return (
    <>
      <AppContext.Provider
        value={{
          usuarioHidden,
          setUsuarioHidden,
          vistaUsuario,
          setVistaUsuario,
          eyesHidden,
          setEyesHidden
        }}
      >
        <Eyes
          eyesHidden={eyesHidden}
          setEyesHidden={setEyesHidden}
          mandarInformacion={mandarInformacion}
        />

        <Routes>
          <Route path="/" element={<RouteInicio />} />
          <Route path="taquilla" element={<RouteTaquilla />} />
          <Route path="acientos" element={<RouteAcientos />} />
          <Route path="usuario" element={<RouteUsuario />} />
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
