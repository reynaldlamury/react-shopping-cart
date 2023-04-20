import { GET_SUCCESS_MSG } from '../actions/types';

const initialState = {
  msg: {},
  // status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS_MSG: {
      return {
        msg: action.payload.msg,
        // status: action.payload.status,
        id: action.payload.id,
      };
    }

    default:
      return state;
  }
}
