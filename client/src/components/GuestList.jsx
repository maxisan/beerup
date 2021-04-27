import React from 'react'
import Guest from './Guest'

export default function GuestList({guestList}) {
  
  return (
    <div className='flex flex-col mx-5 my-2'>
      <h2 className='self-center title'>Van a estar: </h2>
      {guestList.map(g => <Guest key={g.id} firstName={g.firstName} lastName={g.lastName} email={g.email} profilePicture={g.profilePicture} confirmed={g.guestmeetup.confirmed} />)}
    </div>
  )
}
