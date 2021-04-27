import dotenv from 'dotenv';
import React, { useState, useContext } from 'react'
import logo from '../resources/beerupLogo.svg'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../context/AppContext';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Login() {
  dotenv.config()

  const sweetAlert = withReactContent(Swal);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  })

  const history = useHistory();

  const {setLoggedUser} = useContext(AppContext)


  const handlerOnChangeLogin = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      data: {
        email: login.email,
        password: login.password,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/user/login`,
    })
      .then(r => {
        sweetAlert.fire({
          icon: 'success',
          text: `Bienvenido ${r.data.firstName}`,
          showConfirmButton: false,
          timer: 2500
        });
        setLoggedUser(r.data);
        history.push('/profile');
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          sweetAlert.fire({
            icon: 'error',
            text: `Usuario o contraseña incorrectos`,
            showConfirmButton: false,
            timer: 2500
          })
        } else {
          sweetAlert.fire({
            icon: 'error',
            text: `Hubo un error, intentá de nuevo más tarde`,
            showConfirmButton: false,
            timer: 3500
          })
        }
      });
  }

  return (
    <div className='flex flex-col items-center h-screen justify-around py-20 -mt-10 '>
      <img src={logo} alt="" className='w-4/6 max-w-xs my-5 ' />
      <form onSubmit={handlerOnSubmit} className='w-full max-w-md my-1'>
        <div className='flex flex-col items-center w-full'>
          <label htmlFor='email' className='labelStyle'>Email:</label>
          <input type="text" id='email' name='email' value={login.email} onChange={handlerOnChangeLogin} className='inputStyle' />
        </div>
        <div className='flex flex-col items-center w-full'>
          <label htmlFor='password' className='labelStyle'>Password:</label>
          <input type='password' id='password' name='password' value={login.password} onChange={handlerOnChangeLogin} className='inputStyle' />
        </div>
        <div className='flex justify-around'>
          <input type="submit" className='btn btn-primary' value='Ingresar' />
          <input type='button' className='btn btn-secondary' value='Volver' onClick={history.goBack} />
        </div>
      </form>
      <h2 className='font-body'>¿Aún no estás registrado?</h2>
      <Link to='/register' className='font-body font-bold'>Registrate ahora</Link>
    </div>
  )
}
