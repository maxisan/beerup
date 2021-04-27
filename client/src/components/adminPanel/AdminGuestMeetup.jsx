import React, {useContext, useEffect} from 'react'
import AppContext from '../../context/AppContext';
import AdminGuestList from './AdminGuestList';
import Button from '../common/Button';
import { useHistory } from 'react-router-dom';

export default function AdminGuestMeetup(props) {

  const meetupId = parseInt(props.match.params.meetupId)

  const {selectedMeetup, getSelectedMeetup} = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    getSelectedMeetup(meetupId)
  },[]);
 
  return (
    <div>
      {selectedMeetup.users && selectedMeetup.users.length? 
        <div>
          <AdminGuestList guestList={selectedMeetup.users} meetupId={meetupId} getSelectedMeetup={getSelectedMeetup}/>
        </div>
      :
      <div>
        <p className='title text-center font-bold text-2xl'>Aún no hay invitados a esta meetup</p>
      </div>
      }
      <div className='desk:flex desk:justify-center'>
        <Button label={'Agregar invitados'} className='btn btn-primary' onClick={() => history.push(`/admin/meetup/${meetupId}/guestlist/add`)}/>
        <Button label='Volver' className='btn btn-secondary' onClick={() => history.push('/admin/meetup')} type='button' />

      </div>
    </div>
  )
}
