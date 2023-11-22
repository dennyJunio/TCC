import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate } from 'react-router-dom'
import InputGroup2 from '../../../components/InputGroup2'
import SelectGroup2 from '../../../components/SelectGroup2'
import './styleEditar.css'

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
        <section className='bodyEditarChamado'>
            <div className='formEditar'>
                <h2>Editar Chamado</h2>

                <form onSubmit={handleSubmit}>
                    <div className='inputsTexto'>
                        <h4>Titulo</h4>
                        <InputGroup2
                            type='text'
                            label='titulo'
                            placeholder='....'
                            name='titulo'
                            handleChange={handleChange}
                        />

                        <h4>Descrição</h4>
                        <InputGroup2
                            type='text'
                            label='Descrição'
                            placeholder='....'
                            name='descricao'
                            handleChange={handleChange}
                        />

                    </div>
                    <form className='formSelect' onSubmit={handleSubmit}>
                        <SelectGroup2
                            name="tipo"
                            label='Tipo'
                            handleChange={handleChange}
                            value={chamados.tipo}
                        >
                            <option selected disabled>Tipo</option>
                            <option value="Incident">Incident</option>
                            <option value="Requisição">Requisição</option>
                        </SelectGroup2>
                        <SelectGroup2
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
                        </SelectGroup2>
                        <button className='buttonEditar' type='submit' style={{ width: '10rem ' }}>Concluir</button>
                    </form>
                </form>

            </div>
        </section>
    )
}

export default EditarChamado