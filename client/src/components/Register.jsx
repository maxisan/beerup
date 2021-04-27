import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import validate from '../utils/validate';


export default function Register() {
  dotenv.config();
  
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    change: 0,
  })

  const [error, setError] = useState({
  })

  const history= useHistory()

  useEffect(() => {
    const errors = validate(user);
    setError(errors);
  },[user.change]);

  const handlerOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      change: user.change + 1
    })
  }

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    if (!Object.keys(error).length) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}user`, {
        user,
      })
        .then(r => {
          if (r.status === 200) {
            alert('Usuario creado exitosamente');
            setUser({
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              change: 0,
            });
            history.push('/login')
          }
        })
        .catch(err => {
          if (err.response.status === 400) {
            alert('Este email ya fue registrado anteriormente');
          } else {
            console.log(err);
          }
        });
    } else {
      alert('Hay errores en el formulario')
    }
  }

  return (
    <div className='my-10'>
      <form className='flex flex-col items-center' onSubmit={handlerOnSubmit} >
        <div className='flex flex-col items-center my-2 w-full max-w-md desk:flex-row desk:justify-between' >
          <label className='labelStyle' htmlFor='firstName'>Nombre:</label>
          <input className={'inputStyle ' + (error.firstName? ' bg-redLigth':'')} type="text" id='firstName' name='firstName' value={user.firstName} onChange={handlerOnChange} />
        </div>
          {error.firstName?<p className='text-xs text-redPrimary -mt-2'>{error.firstName}</p>: null}
        <div className='flex flex-col items-center my-2  w-full max-w-md desk:flex-row desk:justify-between'>
          <label className='labelStyle' htmlFor='lastName'>Apellido:</label>
          <input className={'inputStyle ' + (error.lastName? ' bg-redLigth':'')} type="text" id='lastName' name='lastName' value={user.lastName} onChange={handlerOnChange} />
        </div>
          {error.lastName?<p className='text-xs text-redPrimary -mt-2'>{error.lastName}</p>: null}
        <div className='flex flex-col items-center my-2  w-full max-w-md desk:flex-row desk:justify-between'>
          <label className='labelStyle' htmlFor='email'>Email:</label>
          <input className={'inputStyle ' + (error.email? ' bg-redLigth':'')} type="text" id='email' name='email' value={user.email} onChange={handlerOnChange} />
        </div>
          {error.email?<p className='text-xs text-redPrimary -mt-2'>{error.email}</p>: null}
        <div className='flex flex-col items-center my-2 w-full max-w-md desk:flex-row desk:justify-between'>
          <label className='labelStyle' htmlFor='password'>Contraseña:</label>
          <input className={'inputStyle ' + (error.password? ' bg-redLigth':'')} type="password" id='password' name='password' value={user.password} onChange={handlerOnChange} />
        </div>
          {error.password?<p className='text-xs text-redPrimary -mt-2'>{error.password}</p>: null}
        <div className='flex flex-col items-center w-full max-w-xs desk:flex-row'>
          <input type="submit" className='btn btn-primary' value='Registrarse' />
          <input type='button' className='btn btn-secondary' value='Cancelar' onClick={history.goBack}/>
        </div>
      </form>
    </div>
  )
}
