import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

function ListaChamados() {
  const [chamados, setChamados] = useState([])
  const [user, setUser] = useState({})
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
      })
      .then((response) => {
        console.log('Response:', response);
        setUser(response.data);
      }) 
      .catch((error) => {
        console.error('API Error:', error.response); 
      });
    }
  }, [token]);  // Added token as a dependency
  
  useEffect(() => {
    // Somente executa o useEffect se o user.nivel for igual a 0
    if (user.nivel === 0) {
      api.get('/chamados/getall').then((response) => {
        setChamados(response.data.chamados)
      })
    } else if (user.nivel === 1) {
      api.get('/chamados/mychamados').then((response) => {
        setChamados(response.data.chamados)
      })
    }
  }, [user.nivel]);  
  

  return ( 
    <div>   
      <h2>Lista de Chamados</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Tipo</th>
            <th scope="col">Status</th>
            <th scope="col">Criado em</th>
            <th scope="col">Ultima Atualização</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado, index) => (
            <tr key={index}>
              <th scope="row">{chamado.id}</th>
              <td>{chamado.titulo}</td>
              <td>{chamado.descricao}</td>
              <td>{chamado.tipo}</td>
              <td>{chamado.status}</td>
              <td>{moment(chamado.createdAt).format('DD/MM/YYYY - HH:mm')}</td>
              <td>{moment(chamado.updatedAt).format('DD/MM/YYYY - HH:mm')}</td>
              <td>
                <Link to={`/chamados/${chamado.id}`}><i class="fa-solid fa-pen fa-lg" style={{color: '#496697', marginLeft: '0.5rem'}}></i></Link>
              </td>
              <td>
                <Link to={`/chamados/${chamado.id}`}><i class="fa-solid fa-xmark fa-xl" style={{color: '#dd2c2c', marginLeft: '1.2rem'}}></i></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
  );
}

export default ListaChamados; 