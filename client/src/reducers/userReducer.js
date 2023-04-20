import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
  Cart: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // let found = state.items.find((item) => item.title === title);
      // state.Cart.push(action.payload);
      let newCart = [...state.Cart, action.payload];
      return {
        ...state,
        Cart: newCart,
      };
    }
    case REMOVE_FROM_CART: {
      let index = state.Cart.findIndex((item) => item._id === action.payload);
      state.Cart.splice(index, 1);
      // state.items[0].filter((item) => item._id !== action.payload);
      // newItems.splice(index, 1);
      return {
        ...state,
        // items: state.items.filter((item) => item.id !== action.payload),
        Cart: state.Cart,
      };
    }
    default:
      return state;
  }
}
