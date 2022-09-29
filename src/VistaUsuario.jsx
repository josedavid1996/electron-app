import React, { useContext } from 'react'
import { w3cwebsocket } from 'websocket'
import { Acientos } from './components/Acientos'
import { Inicio } from './components/Inicio'
import Taquilla from './components/Taquilla'
import { AppContext } from './context'

const UsuarioHidden = () => {
  let client = new w3cwebsocket('ws://localhost:8080/', 'echo-protocol')

  client.onmessage = function (e) {
    // setEyesHidden(JSON.parse(e.data))
    console.log('desde el usuario', JSON.parse(e.data))
  }
  return (
    <h1 className="title" style={{ fontSize: '80px' }}>
      LOGO
    </h1>
  )
}

const Vistas = () => {
  const { vistaUsuario } = useContext(AppContext)
  return (
    <>
      <h1 className="title" style={{ fontSize: '80px' }}>
        PUEDES VER<i class="fas fa-grip-vertical    "></i>
      </h1>
    </>
  )
}

export const VistaUsuario = () => {
  const { usuarioHidden, setUsuarioHidden } = useContext(AppContext)
  let client = new w3cwebsocket('ws://localhost:8080/', 'echo-protocol')
  console.log(usuarioHidden)
  client.onmessage = function (e) {
    // setEyesHidden(JSON.parse(e.data))
    // console.log('desde el usuario', JSON.parse(e.data))
    setUsuarioHidden(JSON.parse(e.data))
  }

  // return usuarioHidden ? <Vistas /> : <UsuarioHidden />
  return <>{usuarioHidden === 'true' ? <Vistas /> : <UsuarioHidden />}</>
}
