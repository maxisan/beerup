import React from 'react'
import Button from '../common/Button'
import { useHistory, Link } from 'react-router-dom';


export default function UserMenu({user, setOpen, logout}) {

  const history = useHistory();

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center text-center w-3/4 my-16'>
        <h2 className='title font-bold'>{`¡Hola ${user.firstName}!`}</h2>
        <p className='body text-md'>Que no te falte la birra</p>
      </div>
      <Button label='Ir a mi perfil' type='button' onClick={() => {history.push('/profile'); setOpen(false)}} className='btn btn-primary' />
      <Button label='Ver todos los meetups' type='button' onClick={''} className='btn btn-secondary' />
      <button type='button' onClick={logout} className='focus:outline-none'>
        <h2 className=' mt-28 font-body font-bold text-redPrimary text-xl'>Logout</h2>
      </button>
    </div>
  )
}