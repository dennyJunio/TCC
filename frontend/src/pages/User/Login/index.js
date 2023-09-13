//Login/index.js
import React from 'react'
import InputLogin from '../../../components/InputLogin'
import { Link } from 'react-router-dom'
import img from './img/SupMate_fundoClaro.png'
import './styleLogin.css';

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

    <section className='body'>
      <div class="form">
        <img class="logo" src={img}></img>
        <h4>Login</h4>
        <div class="login">
          <h5>Usuário</h5>
          <form class="input" onSubmit={handleSubmit}>
            <InputLogin
              label='name'
              type='name'
              name='name'
              placeholder='Username'
              handleChange={handleChange}
            />
            <h5>Senha</h5>
            <InputLogin
              label='password'
              type='password'
              name='password'
              placeholder='Password'
              handleChange={handleChange}
            />
            <button class="button" type='submit'>Login</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login