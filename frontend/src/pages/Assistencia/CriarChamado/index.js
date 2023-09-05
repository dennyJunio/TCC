//componente register 
import React from 'react'
import InputGroup from '../../../components/InputGroup'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../../context/UserContext'
import SelectGroup from '../../../components/SelectGroup'

function CriarChamado() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [chamado, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...chamado, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento){
    evento.preventDefault()
    register(chamado)
  }

  return (
    <div>
      <h2>Abrir Chamado</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <InputGroup
            type='text'
            label='Titulo'
            placeholder='Adicione titulo'
            name='titulo'
            handleChange={handleChange}
          />
          <InputGroup
            type='text'
            label='Descrição'
            placeholder='....'
            name='descricao'
            handleChange={handleChange}
          />
            <SelectGroup 
            name="tipo"
            handleChange={handleChange}
            >
            <option>Tipo</option>
            <option value="0">Admin</option>
            <option value="1">Usuario</option>
          </SelectGroup> 
          {/* <InputGroup
            type='password'
            label='Confirme sua senha'
            placeholder='Confirme sua senha'
            name='confirmpassword'
            handleChange={handleChange}
          /> */}
          <button type='submit'>Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default CriarChamado