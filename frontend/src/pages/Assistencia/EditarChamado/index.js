import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'
import SelectGroup from '../../../components/SelectGroup'

function EditarChamado() {
    const [chamados, setChamados] = useState([])
    const [preview, setPreview] = useState()
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            alert('Por favor faça o login')
            navigate('/login')
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setChamados(response.data)
            })
        }  
    }, [token, navigate])
  
    function handleChange(e) {
        setChamados({ ...chamados, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()

        //adiciona as outras propriedades do usuario ao formData
        await Object.keys(chamados).forEach((key) => formData.append(key, chamados[key]))

        const data = await api.patch(`chamados/editar/${chamados.id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
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
        <div>
            <h2>Editar Chamado</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                        type='text'
                        label='titulo'
                        placeholder='Adicione titulo'
                        name='titulo'
                        handleChange={handleChange}
                        value={chamados.titulo}
                    />
                    <InputGroup
                        type='text'
                        label='Descrição'
                        placeholder='....'
                        name='descricao'
                        handleChange={handleChange}
                        value={chamados.descricao}
                    />
                    <SelectGroup
                        name="tipo"
                        label='Tipo'
                        handleChange={handleChange}
                        value={chamados.tipo}
                    >
                        <option selected disabled>Tipo</option>
                        <option value="Incident">Incident</option>
                        <option value="Requisição">Requisição</option>
                    </SelectGroup>
                    <SelectGroup
                        name="status"
                        label='Status'
                        handleChange={handleChange}
                        value={chamados.status}
                    >
                        <option selected disabled>Status</option>
                        <option value="Novo">Novo</option>
                        <option value="Andamento">Andamento</option>
                        <option value="Encerrado">Encerrado</option>
                    </SelectGroup>
                    <button type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default EditarChamado