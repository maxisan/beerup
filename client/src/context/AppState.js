import React, {useReducer} from 'react';
import AppReducer from './AppReducer';
import AppContext from './AppContext';
import axios from 'axios';
import * as actions from './constants'
import dotenv from 'dotenv';

export default function AppState(props) {
  dotenv.config();
  
  const initialState = {
    userList: [],
    loggedUser: {},
    meetupList: [],
    selectedMeetup: {},
  }

  const [state, dispatch] = useReducer(AppReducer, initialState)
  
  const getAllUsers = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`)
      .then(res => {
        dispatch({
          type: actions.GET_ALL_USERS,
          payload: res.data,
        })
      })
      .catch(err => console.log(err))
  };
  
  const setLoggedUser = (user) => {
    dispatch({
      type: actions.SET_LOGGED_USER,
      payload: user,
    });
  }
  
  const getAllMeetups = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/meetup`)
      .then(res => {
        dispatch({
          type: actions.GET_ALL_MEETUPS,
          payload: res.data,
        })
      })
      .catch(err => console.log(err))
  };
  
  const getSelectedMeetup = (id) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/meetup/${id}`)
      .then(res => {
        dispatch({
          type: actions.GET_SELECTED_MEETUP,
          payload: res.data,
        })
      })
  };

  return (
    <AppContext.Provider value={{
      userList: state.userList,
      loggedUser: state.loggedUser,
      meetupList: state.meetupList,
      selectedMeetup: state.selectedMeetup,
      getAllUsers,
      getAllMeetups,
      setLoggedUser,
      getSelectedMeetup,
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
