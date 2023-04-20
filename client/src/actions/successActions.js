import { GET_SUCCESS_MSG } from './types';

// return error
export const returnSuccess = (msg, id = null) => {
  return {
    type: GET_SUCCESS_MSG,
    payload: { msg, id },
  };
};
