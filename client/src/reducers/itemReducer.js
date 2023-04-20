// import uuid from 'uuid';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from '../actions/types';
// import eggs from '../images2/eggs.jpg';
// import milk from '../images2/milk.jpg';
// import steak from '../images2/steak.jpg';
// import water from '../images2/water.jpg';
// ============================== all dependencies life up here

const initialState = {
  items: [],
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      state.items.push(action.payload);
      return {
        ...state,
        items: state.items,
        loading: false,
      };

    case ADD_ITEM: {
      // let found = state.items.find((item) => item.title === title);
      state.items[0].push(action.payload);
      return {
        ...state,
        items: state.items,
      };
    }
    case DELETE_ITEM: {
      let index = state.items[0].findIndex(
        (item) => item._id === action.payload,
      );
      state.items[0].splice(index, 1);
      // state.items[0].filter((item) => item._id !== action.payload);
      // newItems.splice(index, 1);

      return {
        ...state,
        // items: state.items.filter((item) => item.id !== action.payload),
        items: state.items,
      };
    }

    case ITEMS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}

// export default itemReducer;
