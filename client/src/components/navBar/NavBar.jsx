import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiCloseLine, RiMenuFill } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'

import beerupLogo from '../../resources/beerupLogo.svg'
import AppContext from '../../context/AppContext';
import NoLoggedMenu from './NoLoggedMenu'
import UserMenu from './UserMenu';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import dotenv from 'dotenv';

export default function NavBar() {
  dotenv.config();

  const {loggedUser, setLoggedUser } = useContext(AppContext);
  const [open, setOpen] = useState(false)
  const history = useHistory();
  
  useState(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BACKEND_URL}/user/auth`,
      withCredentials: true,
    })
      .then(r => {
        setLoggedUser(r.data);
      })
      .catch(error => console.log(error));
  },[])

  const logout = () => {

    axios({
      method: 'GET',
      withCredentials: true,
      url: `${process.env.REACT_APP_BACKEND_URL}/user/logout`
    })
      .then(r => setLoggedUser(r.data))
      .catch(error => console.log(error));
    
    setOpen(false);
    history.push('/');
  }
  
  return (
    <>
      <nav className='relative top-0 left-0 flex justify-between px-5 py-2 shadow-lg border-b-2 bg-white border-redPrimary z-50 mb-5  '>
        <Link to='/' onClick={() => setOpen(false)}>
          <img src={beerupLogo} alt="" className='h-20 ' />
        </Link>
        <button type='button' onClick={() => setOpen(!open)} className='text-2xl  focus:outline-none '>{open ? <RiCloseLine /> : <RiMenuFill />}</button>
      </nav>
      <div onClick={() => setOpen(false)} className={open ? 'absolute top-0 right-0 h-full w-full bg-opacity-90 bg-almostBlack z-10 ' : 'hidden'}>
      </div>

      <div className={open ? 'absolute top-0 right-0 h-full w-4/6 desk:max-w-sm bg-white pt-28 z-30' : 'hidden'}>
        {!loggedUser.id? 
          <NoLoggedMenu setOpen={setOpen} />
        :
        loggedUser.role === 'admin'?
          
          <AdminMenu user={loggedUser} setOpen={setOpen} logout={logout} />

          :
          <UserMenu user={loggedUser} setOpen={setOpen} logout={logout} />
        }

      </div>
    </>
  )
}
