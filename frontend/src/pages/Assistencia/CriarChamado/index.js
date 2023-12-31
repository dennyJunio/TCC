//componente register 
import React, { useState } from 'react'
import api from '../../../utils/api'
import InputGroup2 from '../../../components/InputGroup2'
import SelectGroup2 from '../../../components/SelectGroup2'
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
    <section className='bodyChamadoCriar'>
      <div className='formChamado'>
        <h2>Abrir Chamado</h2>
        <form className='inputChamado' onSubmit={handleSubmit}>
          <h5>Título</h5>
          <InputGroup2
            type='text'
            placeholder='Adicione titulo'
            name='titulo'
            handleChange={handleChange}
            style={{ width: '30rem' }}
          />
          <h5>Descrição</h5>
          <InputGroup2 
            type='text'
            placeholder='....'
            name='descricao'
            handleChange={handleChange}
            style={{ width: '10rem', heigh: '1000rem' }}
          />

        </form>
      </div>

      <div className='options'>
        <form className='inputChamado' onSubmit={handleSubmit}>
          <div className="OpTipo">
            <h5>Tipo</h5>
            <SelectGroup2
              name="tipo"
              label='Tipo'
              handleChange={handleChange}
            >
              <option class="form-select" selected disabled>Tipo</option>
              <option value="Incident">Incident</option>
              <option value="Requisição">Requisição</option>
            </SelectGroup2>
          </div>
          <div className='OpStatus'>
            <h5>Status</h5>
            <SelectGroup2
              name="status"
              label='Status'
              handleChange={handleChange}
            >
              <option selected disabled>Status</option>
              <option value="Novo">Novo</option>
              <option value="Andamento">Andamento</option>
              <option value="Solucionado">Solucionado</option>
              <option value="Cancelado">Cancelado</option>
            </SelectGroup2>
            <button className='registrar' type='submit' style={{ width: '10rem ' }}>Registrar</button>
          </div>
        </form>

      </div>
    </section >
  )
}

export default CriarChamado