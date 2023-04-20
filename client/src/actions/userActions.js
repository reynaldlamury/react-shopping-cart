import { ADD_TO_CART, REMOVE_FROM_CART } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// ======================== ADD TO CART ======================== //
export const addToCart = (obj) => async (dispatch, getState) => {
  try {
    console.log('enter addToCart function in ./actions/userActions.js');
    const { currentUser: userID } = obj;

    const res = await axios.put(
      `/api/users/${userID}/cart`,
      obj,
      await tokenConfig(getState),
    );
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

// ======================== REMOVE FROM CART ======================== //
export const removeFromCart = (obj) => async (dispatch, getState) => {
  try {
    console.log('enter removeFromCart function in ./actions/userActions.js');
    const { currentUser: userID } = obj;

    await axios.put(
      `/api/users/${userID}/cart/remove`,
      obj,
      await tokenConfig(getState),
    );
    dispatch({
      type: REMOVE_FROM_CART,
      payload: {},
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
