import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import InputGroup from '../../../components/InputGroup2'
import SelectGroup from '../../../components/SelectGroup2'

function EditarChamado() {
    const { id } = useParams(); //pega o id da url
    const [editchamados, setEditChamados] = useState({});
    const [user, setUser] = useState({});
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
                setUser(response.data);

            });

        }
    }, [token, navigate]);

    function handleChange(e) {
        setEditChamados({ ...editchamados, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(editchamados).forEach((key) => formData.append(key, editchamados[key]));

        try {
            const response = await api.patch(`chamados/editar/${id}`, formData, {
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
        <section className='bodyChamadoCriar'>
            <div className='formChamado' >
                <h2>Editar Chamado</h2>
                <form className='inputChamado' onSubmit={handleSubmit} >
                    <h5>Título</h5>
                    <InputGroup
                        type='text'
                        label='titulo'
                        placeholder='Adicione titulo'
                        name='titulo'
                        handleChange={handleChange}
                        style={{ width: '30rem' }}
                    />
                    <h5>Descrição</h5>
                    <InputGroup
                        type='text'
                        label='Descrição'
                        placeholder='....'
                        name='descricao'
                        handleChange={handleChange}
                    />
                </form>
            </div>
            <div className='options'>
                <form className='inputChamado' onSubmit={handleSubmit}>
                    <div className="OpTipo">
                        <h5>Tipo</h5>
                        <SelectGroup
                            name="tipo"
                            label='Tipo'
                            handleChange={handleChange}
                            value={editchamados.tipo}
                        >
                            <option selected disabled>Tipo</option>
                            <option value="Incident">Incident</option>
                            <option value="Requisição">Requisição</option>
                        </SelectGroup>
                    </div>
                    <div className='OpStatus'>
                        <h5>Status</h5>
                        <SelectGroup
                            name="status"
                            label='Status'
                            handleChange={handleChange}
                            value={editchamados.status}
                        >
                            <option selected disabled>Status</option>
                            <option value="Novo">Novo</option>
                            <option value="Andamento">Andamento</option>
                            <option value="Solucionado">Solucionado</option>
                            <option value="Cancelado">Cancelado</option>
                        </SelectGroup>
                        <button className='registrar' type='submit' style={{ width: '10rem ' }}>Concluir</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditarChamado