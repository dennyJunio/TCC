import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';

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

  return ( 
    <div>   
      <h2>Lista de Usuários</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuário</th>
            <th scope="col">Nível</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{user.id}</th>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.nivel}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
  );
}

export default ListaUser;