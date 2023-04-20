import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { returnSuccess } from './successActions';

export const getItems = () => async (dispatch) => {
  try {
    dispatch(setItemsLoading());
    const res = await axios.get('/api/items');
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const addItem = (item) => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      '/api/items',
      item,
      await tokenConfig(getState),
    );
    dispatch({
      type: ADD_ITEM,
      payload: res.data,
    });
    dispatch(returnSuccess(res.statusText, 'ITEM_ADDED_SUCCESS'));
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/items/${id}`, await tokenConfig(getState));
    dispatch({
      type: DELETE_ITEM,
      payload: id,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
