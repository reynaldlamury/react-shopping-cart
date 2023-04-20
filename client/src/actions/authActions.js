import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// ======================= Check token & load user =================//
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({
    type: USER_LOADING,
  });
  try {
    const res = await axios.get('api/auth/users', await tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//  ======================= Register User ========================//
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // body
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//  ======================= Login User ========================//
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    // headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // body
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post('api/auth', body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//  ======================= Logout User ========================/
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//  ======================= TOKEN CONFIG ========================/
export const tokenConfig = async (getState) => {
  // get token from localStorage
  const token = await getState().auth.token;

  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // if token, add to headers
  if (token) {
    config.headers['x-token-auth'] = token;
  }

  return config;
};
