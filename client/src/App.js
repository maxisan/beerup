import { Route, Switch } from 'react-router-dom';

/**Import components */

import NavBar from './components/navBar/NavBar';
import Home from './components/Home';
import Login from './components/Login'
import Meetup from './components/Meetup';
import Register from './components/Register';
import Profile from './components/Profile';
import MeetupForm from './components/adminPanel/MeetupForm';
import AdminMeetup from './components/adminPanel/AdminMeetup';
import AdminGuestMeetup from './components/adminPanel/AdminGuestMeetup';
import AdminAddGuestToMeet from './components/adminPanel/AdminAddGuestToMeet';

/** Import App context for state management */

import AppState from './context/AppState';

function App() {
  return (
    <>
      <AppState>
        <Switch>
          <Route path={['/admin']} component={NavBar}/>
          <Route exact path={['/', '/meetup/:id', '/register', '/profile']} component={NavBar} />
        </Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/meetup/:id' component={Meetup} />
        <Route exact path='/admin/meetup' component={AdminMeetup} />
        <Route exact path='/admin/meetup/new' component={MeetupForm} />
        <Route exact path='/admin/meetup/:meetupId/guestlist' component={AdminGuestMeetup} />
        <Route exact path='/admin/meetup/:meetupId/guestlist/add' component={AdminAddGuestToMeet} />

        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={Profile} />
        
      </AppState>
    </>
  );
}

export default App;
