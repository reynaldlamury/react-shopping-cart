import { SEND_RESPASS_EMAIL, RESET_PASSWORD_SUCCESS } from '../actions/types';

const initialState = {
  link: null,
  token: null,
  user: null,
};

export default function resetPass(state = initialState, action) {
  switch (action.type) {
    case SEND_RESPASS_EMAIL:
      return {
        ...state,
        link: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
