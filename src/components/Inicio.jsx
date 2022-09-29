import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context'

export const Inicio = () => {
  const { setVistaUsuario } = useContext(AppContext)
  return (
    <>
      <header>
        <ul>
          <Link onClick={() => setVistaUsuario('inicio')} to="/">
            Inicio
          </Link>
          <Link onClick={() => setVistaUsuario('taquilla')} to="taquilla">
            Taquilla
          </Link>
          <Link onClick={() => setVistaUsuario('acientos')} to="acientos">
            Acientos
          </Link>
        </ul>
      </header>
      <h1 className="title">Inicio</h1>
    </>
  )
}
