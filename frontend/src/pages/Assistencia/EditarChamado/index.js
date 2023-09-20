import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup'
import SelectGroup from '../../../components/SelectGroup'

function EditarChamado() {
    const [chamados, setChamados] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('Por favor faça o login');
            navigate('/login');
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setChamados(response.data);
            }).catch(error => {
                console.error('Erro ao verificar usuário:', error);
                // Pode redirecionar para a página de login aqui se o token for inválido ou expirou.
                navigate('/login');
            });
        }
    }, [token, navigate]);

    function handleChange(evento) {
        const { name, value } = evento.target;
        setChamados(prevChamados => ({
            ...prevChamados,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(chamados).forEach((key) => formData.append(key, chamados[key]));

        try {
            const response = await api.patch(`chamados/editar/${chamados.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Erro ao editar chamado:', error);
        }
    }

    return (
        <div>
            <h2>Editar Chamado</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                        type='text'
                        label='titulo'
                        placeholder='....'
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
                        <option value="Solucionado">Solucionado</option>
                        <option value="Cancelado">Cancelado</option>
                    </SelectGroup>
                    <button type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    )
}

export default EditarChamado