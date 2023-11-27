import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import "./styleUsuarios.css"

function ListaUser() {
  const [users, setUsers] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
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
      })
        .then((response) => {
          if (response.data.nivel === 0) {
            api.get('/users/myusers').then((usersResponse) => {
              setUsers(usersResponse.data.users);
            });
          }
        })
        .catch((error) => {
          console.error('API Error:', error.response);
        });
    }
  }, [token, navigate]);

  async function removeUser(id) {
    try {
      const response = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        alert('Usuário removido com sucesso.');
      } else {
        alert('Falha ao remover o usuário.');
      }
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      alert('Erro ao remover o usuário.');
    }
  }


  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuário</th>
            <th scope="col">Nível</th>
            <th scope="col">Criado em</th>
            <th scope="col">Editar</th>
            <th scope="col">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.nivel}</td>
              <td>{moment(user.createdAt).format('DD/MM/YYYY - HH:mm')}</td>
              <td>
                <Link to={`/users/${user.id}`}><i class="fa-solid fa-pen fa-lg" style={{ color: '#496697', marginLeft: '0.5rem' }}></i></Link>
              </td>
              <td>
                <button className="invisible-button" onClick={() => { removeUser(user.id) }}>
                  <i className="fa-solid fa-xmark fa-xl" style={{ color: '#dd2c2c' }}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaUser;
