import React, { useState, useEffect } from 'react'
import api from '../../../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import SelectGroup from '../../../components/SelectGroup2'
import InputGroup from '../../../components/InputGroup2'

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({})
  const [userEdit, setUserEdit] = useState({})
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
        setUserEdit(response.data)
      })
    }
  }, [token, navigate])

  function handleChange(e) {
    setUserEdit({ ...userEdit, [e.target.name]: e.target.value })
  }

  //trabalhando com a imagem
  // const [image, setImage] = useState(null)

  // function onFileChange(e) {
  //   setPreview(URL.createObjectURL(e.target.files[0]))
  //   setImage(e.target.files[0])
  // }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()

    //adiciona a imagem ao formdata (se ela existir)
    // if (image) {
    //   formData.append('image', image)
    // }

    //adiciona as outras propriedades do usuario ao formData
    Object.keys(userEdit).forEach((key) => formData.append(key, userEdit[key]))

    const data = await api.patch(`users/edit/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json'
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
    <div className='bodyUsuarioCriar'>
      <section className='formUsuario'>
        <h2>Editar Perfil</h2>
        {/* <img
        style={{ height: '200px', width: '200px' }}
        className='rounded-circle m-3'
        src={'http://localhost:5000/image/users/' + user.image}
        alt='Foto de perfil'
      /> */}
        <div>
          <form className='inputUsuario' onSubmit={handleSubmit}>
            {/* <InputGroup
          label='Imagem'
          type='file'
          name='image'
          handleChange={onFileChange}
        /> */}
            <InputGroup
              type='text'
              label='Digite o nome'
              placeholder='Nome '
              name='name'
              handleChange={handleChange}
            />
            <InputGroup
              type='password'
              label='Digite a senha'
              placeholder='Senha'
              name='password'
              handleChange={handleChange}
            />
            <InputGroup
              type='password'
              label='Confirme a senha'
              placeholder='Confirme Senha'
              name='confirmpassword'
              handleChange={handleChange}
            />
            <SelectGroup
              name="nivel"
              label="Tipo de Usuario"
              handleChange={handleChange}
            >
              <option selected disabled>Nivel</option>
              <option value="0">Admin</option>
              <option value="1">Usuario</option>
            </SelectGroup>
            <button className='registrarUsiario' type='submit'>Atualizar</button>
          </form>
        </div>
      </section>
    </div >
  )
}

export default Profile