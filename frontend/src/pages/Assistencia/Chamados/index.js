import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom'


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
      }).then((response) => {
        setUser(response.data)
      })
    }
  }, [])

   console.log(user.nivel === 0)


   useEffect(() => {
    // Somente executa o useEffect se o user.nivel for igual a 0
    if (user.nivel === 0) {
      api.get('/chamados/getall').then((response) => {
        setChamados(response.data.chamados)
      })
    }
  }, [])




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
          </tr>
        </thead>
        <tbody>
          {chamados.map((chamado, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{chamado.titulo}</td>
              <td>{chamado.descricao}</td>
              <td>{chamado.tipo}</td>
              <td>{chamado.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaChamados;
