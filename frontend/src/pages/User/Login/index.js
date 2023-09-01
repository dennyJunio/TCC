//Login/index.js
import React from 'react'
import InputGroup from '../../../components/InputGroup'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import './style.css';

//hooks
import { useContext, useState } from 'react'
//context
import { Context } from '../../../context/UserContext'


function Login() {
  //aqui entra a lógica para o login

  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
    <div class="card">
      <div class='card-body'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        
        <InputGroup
          label='name'
          type='name'
          name='name'
          placeholder='Digite seu nome'
          handleChange={handleChange}
        />
        <InputGroup
          label='password'
          type='password'
          name='password'
          placeholder='Digite seu password'
          handleChange={handleChange}
        />
        <button type='submit' class="btn btn-info">Login</button>
      </form>
      </div>
    </div>
  )
}

export default Login