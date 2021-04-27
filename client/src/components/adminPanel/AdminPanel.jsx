import React from 'react'
import MeetupCard from './meetupCard/MeetupCard'

export default function AdminPanel() {
    return (
        <div>
            <h1 className='font-title text-4xl my-8'>Próxima Meetup</h1>
            <MeetupCard />
        </div>
    )
}
