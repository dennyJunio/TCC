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
  const [chamado, setChamado] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  function handleChange(evento) {
    setChamado({ ...chamado, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  async function handleSubmit(evento) {
    evento.preventDefault()

    const formData = new FormData()

    //montando objeto com o formulario
    await Object.keys(chamado).forEach((key) => formData.append(key, chamado[key]))

    // const data = await api.post(`pets/create`, formData, {
    //   headers: {
    //     Authorization: `Bearer ${JSON.parse(token)}`,
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }).then((response) => {
    //   return response.data
    // }).catch((err) => {
    //   alert(err.response.data)
    //   return err.response.data
    // })
    // alert(data.message)
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
          <SelectGroup
            name="status"
            handleChange={handleChange}
          >
            <option value="0">New</option>
            <option value="1">Andamento</option>
            <option value="2">Encerrado</option>
          </SelectGroup>
          <button type='submit'>Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default CriarChamado