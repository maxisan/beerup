import * as actions from './constants';

export default (state, action) => {
  const { payload, type } = action

  switch (type) {
    case actions.GET_ALL_MEETUPS:
      return {
        ...state,
        meetupList: payload,
      }
    case actions.GET_ALL_USERS:
      return {
        ...state,
        userList: payload
      }
    case actions.GET_SELECTED_MEETUP:
      return {
        ...state,
        selectedMeetup: payload,
      }
    case actions.SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: payload,
      }

    default:
      return state;
  }
}