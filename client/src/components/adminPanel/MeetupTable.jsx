import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { AiFillDownCircle, AiFillEdit, AiTwotoneDelete, AiOutlineWarning } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import meetupBeerCalculator from '../common/beerCalculator';
import dotenv from 'dotenv';

export default function MeetupTable() {
  const DeleteAlert = withReactContent(Swal);

  const [open, setOpen] = useState({
    menu: {},
    warning: {},
  })

  const { getAllMeetups, meetupList, getAllUsers, userList } = useContext(AppContext);

  useEffect(() => {
    getAllMeetups();
    getAllUsers();
  }, []);

  const deleteMeetup = meetup => {
    DeleteAlert.fire({
      title: <p>Estás a punto de eliminar una meetup</p>,
      icon: 'question',
      html:
        <div>
          <p>id: <b>{meetup.id}</b></p>
          <p>Fecha: <b>{meetup.date}</b></p>
          <p>Hora: <b>{meetup.time}</b></p>
          <p>¿Deseas eliminarla definitivamente?</p>
        </div>,
      confirmButtonText: 'Eliminarla',
      showDenyButton: true,
      denyButtonText: 'No eliminarla',
    })
      .then(result => {
        if (result.isConfirmed) {
          axios({
            method: 'DELETE',
            withCredentials: true,
            url: `${process.env.REACT_APP_BACKEND_URL}/meetup/${meetup.id}`,
          })
            .then(r => {
              getAllMeetups();
            })
            .catch(error => console.log(error));
        }
      })
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-redPrimary ">
              <thead className="bg-redLigth">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Id
                    </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Fecha
                    </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                    Hora
                    </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider" >
                    Invitados
                    </th>
                  <th scope='col' className='px-6 py-3 text-center text-xs font-medium uppercase tracking-wider'>
                    Temp. max
                    </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Birras a comprar
                    </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    Acciones
                    </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-redPrimary text-center">
                {meetupList.map(meetup => (
                  <>
                    <tr key={meetup.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-almostBlack">{meetup.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-almostBlack">{meetup.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-almostBlack">{meetup.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-almostBlack flex">
                        <p className='mr-3'>{meetup.users.length} invitados</p>
                        <Link to={`/admin/meetup/${meetup.id}/guestlist`}>
                          <span className='text-almostBlack font-title py-1 px-2 border-almostBlack border-solid border-2 rounded-full hover:border-redPrimary transition-all duration-200'>
                            Ver lista
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-almostBlack ">
                        <p className='mr-3'>{meetup.weather ? <>{meetup.weather.main.temp_max}°</> : 'Sin datos'}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-almostBlack flex justify-center">
                        <p className='mr-3'>{meetupBeerCalculator(meetup).beer}</p>
                        {meetupBeerCalculator(meetup).error ?
                          <div className='relative'>
                            <AiOutlineWarning className='text-xl'
                              onMouseOver={() =>
                                setOpen({
                                  ...open,
                                  warning: {
                                    ...open.warning,
                                    [meetup.id]: !open.warning[meetup.id],
                                  }
                                })}
                              onMouseOut={() =>
                                setOpen({
                                  ...open,
                                  warning: {
                                    ...open.warning,
                                    [meetup.id]: !open.warning[meetup.id],
                                  }
                                })} />
                            <p className={open.warning[meetup.id] ? 'absolute bg-yellow-400 font-bold py-1 px-2 rounded-lg top-auto right-0 ' : 'hidden'}>{meetupBeerCalculator(meetup).error}</p>
                          </div>
                          : null}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" onClick={() =>
                        setOpen({
                          ...open,
                          menu: {
                            ...open.menu,
                            [meetup.id]: !open.menu[meetup.id],
                          }
                        })}>
                        <div className="text-2xl text-almostBlack" >
                          <AiFillDownCircle className='m-auto' />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='7' className={`h-10 font-bold text-almostBlack font-title ${!open.menu[meetup.id] ? 'hidden' : ''}`} >
                        <div className='flex flex-row m-auto justify-between max-w-xs '>
                          <Link>
                            <div className='flex flex-row items-center'>
                              <AiFillEdit />
                              <p className='ml-2'>Editar</p>
                            </div>
                          </Link>
                          <div className='flex flex-row items-center cursor-pointer' onClick={() => deleteMeetup(meetup)}>
                            <AiTwotoneDelete />
                            <p className='ml-2'>Eliminar</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
