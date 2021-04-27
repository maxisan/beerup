import React from 'react'

export default function Guest({firstName, lastName, email, profilePicture, confirmed}) {

  return (
    <div className='flex flex-row items-center my-3'>
      <img src={profilePicture} alt="" className='w-14'/>
      <div className='ml-2'>
        <h2 className='font-bold'>{`${firstName} ${lastName}`}</h2>
        <h2 className='text-xs '>{email}</h2>
      </div>
    </div>
  )
}
