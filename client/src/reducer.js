export const beginState = {
  basket: [],
  isExist: false,
  LoginPageActive: false,
  HomePageActive: true,
  ProductPageActive: false,
  isGrayScale: false,
  AuthOK: false,
  currentPath: '',
  registerUI: false,
};

//  -------------------- selector ------------------------------ //
export const getBasketTotal = (basket) => {
  return basket.reduce((sum, basket) => sum + basket.price, 0);
};

//  -------------------- selector ------------------------------ //

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'GET_CURRENT_PATH': {
      return {
        ...state,
        currentPath: action.payload,
      };
    }

    case 'ADD_TO_BASKET': {
      let exist = false;
      let Basket;

      state.basket.forEach((product) => {
        if (product.id === action.item.id) {
          exist = true;
        }
      });

      if (!exist) {
        Basket = [...state.basket, action.item];
      } else {
        Basket = [...state.basket];
      }

      return {
        ...state,
        basket: Basket,
        isExist: exist,
      };
    }

    case 'REMOVE_FROM_BASKET': {
      const index = state.basket.findIndex((item) => item.id === action.id);

      let newBasket = [...state.basket];
      newBasket.splice(index, 1);

      return {
        ...state,
        basket: newBasket,
        isExist: false,
      };
    }

    case 'LOGIN_PAGE_CLICK': {
      return {
        ...state,
        LoginPageActive: action.InLoginPage,
        HomePageActive: action.InHomePage,
        ProductPageActive: action.InProductPage,
      };
    }

    case 'HOME_PAGE_CLICK': {
      return {
        ...state,
        LoginPageActive: action.InLoginPage,
        HomePageActive: action.InHomePage,
        ProductPageActive: action.InProductPage,
      };
    }

    case 'PRODUCT_PAGE_CLICK': {
      return {
        ...state,
        LoginPageActive: action.InLoginPage,
        HomePageActive: action.InHomePage,
        ProductPageActive: action.InProductPage,
      };
    }

    case 'POST_UI_CLICK': {
      return {
        ...state,
        isGrayScale: action.UIActive,
      };
    }

    case 'REGISTER_UI_CLICK': {
      return {
        ...state,
        registerUI: action.payload,
      };
    }

    case 'VALIDATE_AUTH': {
      return {
        ...state,
        AuthOK: action.status,
      };
    }

    default:
      return state;
  }
};

export default reducer;
