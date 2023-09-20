//componente register 
import React, { useState } from 'react'
import api from '../../../utils/api'
import InputChamados from '../../../components/InputChamados'
import SelectGroup from '../../../components/SelectGroup'
import "./styleCriarChamado.css"

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

    const data = await api.post(`/chamados/create`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      alert(err.response.data)
      return err.response.data
    })
    alert(data.message)
  }

  return (
    <div className='bodyChamadoCriar'>
      <h2>Abrir Chamado</h2>
      <div className='formChamado'>
        <h5>Título</h5>
        <form className='inputChamado' onSubmit={handleSubmit}>
          <InputChamados
            type='text'
            label='titulo'
            placeholder='Adicione titulo'
            name='titulo'
            handleChange={handleChange}
          />
          <h5>Descrição</h5>
          <InputChamados
            type='text'
            label='Descrição'
            placeholder='....'
            name='descricao'
            handleChange={handleChange}
          />
          <SelectGroup
            name="tipo"
            label='Tipo'
            handleChange={handleChange}
          >
            <option selected disabled>Tipo</option>
            <option value="Incident">Incident</option>
            <option value="Requisição">Requisição</option>
          </SelectGroup>
          <SelectGroup
            name="status"
            label='Status'
            handleChange={handleChange}
          >
            <option selected disabled>Status</option>
            <option value="Novo">Novo</option>
            <option value="Andamento">Andamento</option>
            <option value="Solucionado">Solucionado</option>
            <option value="Cancelado">Cancelado</option>
          </SelectGroup>
          <button type='submit'>Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default CriarChamado