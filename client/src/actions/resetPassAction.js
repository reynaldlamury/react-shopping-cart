import axios from 'axios';
import { returnErrors } from './errorActions';
import { returnSuccess } from './successActions';
// import { tokenConfig } from './authActions';

import { SEND_RESPASS_EMAIL, RESET_PASSWORD_SUCCESS } from './types';

export const sendEmail = (email) => async (dispatch) => {
  console.log('email:', email);

  try {
    const res = await axios.post('/api/forgot-password', email);
    dispatch({
      type: SEND_RESPASS_EMAIL,
      payload: res.data,
    });
    dispatch(returnSuccess(res.statusText, 'EMAIL_SENT'));
  } catch (err) {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'SEND_EMAIL_FAIL'),
    );
    console.log(err);
  }
};

export const resetPassword = (obj) => async (dispatch) => {
  const { id, token } = obj;

  try {
    const res = await axios.put(`/api/forgot-password/${id}/${token}`, obj);
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
    dispatch(returnSuccess(res.statusText, 'RESET_PASSWORD_SUCCESS'));
  } catch (err) {
    dispatch(
      returnErrors(
        err.response.data,
        err.response.status,
        'RESET_PASSWORD_FAIL',
      ),
    );
    console.log(err);
  }
};
