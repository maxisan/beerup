import React from 'react'
import Button from '../common/Button'
import { useHistory } from 'react-router-dom';


export default function NoLoggedMenu({setOpen}) {

  const history = useHistory();

  return (
    <div className='flex flex-col items-center'>
      <Button label='Login' type='button' onClick={() => history.push('/login')} className='btn btn-primary' />
      <Button label='Registrarse' type='button' onClick={() => { history.push('/register'); setOpen(false)}} className='btn btn-secondary' />
    </div>
  )
}
