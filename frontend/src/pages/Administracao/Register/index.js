//componente register 
import React from 'react'
import InputGroup2 from '../../../components/InputGroup2'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../../context/UserContext'
import SelectGroup2 from '../../../components/SelectGroup2'
import "./styleRegister.css"

function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    register(user)
  }

  return (
    <div className='bodyUsuarioCriar'>
      <section className='formUsuario'>
        <h2>Registrar Usuario</h2>
        <div>
          <form className='inputUsuario' onSubmit={handleSubmit}>
            <h5>Digite o nome</h5>
            <InputGroup2
              type='text'
              label='Digite seu nome'
              placeholder='Nome '
              name='name'
              handleChange={handleChange}
            />
            <h5>Digite a senha</h5>
            <InputGroup2
              type='password'
              label='Digite sua senha'
              placeholder='Senha'
              name='password'
              handleChange={handleChange}
            />
            <h5>Confirme a senha</h5>
            <InputGroup2
              type='password'
              label='Confirme sua senha'
              placeholder='Confirme Senha'
              name='confirmpassword'
              handleChange={handleChange}
            />
            <h5>Tipo de Usuario</h5>
            <SelectGroup2
              name="nivel"
              label="Tipo de Usuario"
              handleChange={handleChange}
            >
              <option selected disabled>Nivel</option>
              <option value="0">Admin</option>
              <option value="1">Usuario</option>
            </SelectGroup2>
            <button className='registrarUsiario' type='submit'>Registrar</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Register