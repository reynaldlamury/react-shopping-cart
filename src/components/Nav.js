import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

const Navbar = styled.div`
  background-color: salmon;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Btn = css`
  cursor: pointer;
  background-color: transplrent;
  color: white;
  padding: 3px 10px;
  border: 1px solid white;
  transition: all ease-in-out 0.1s;
  &:hover {
    background-color: #755ef8;
  }
`;

const ProductsBtn = styled.div`
  ${Btn}
  text-decoration: none;

  &.active {
    background-color: #755ef8;
  }
`;

const HomeBtn = styled.div`
  ${Btn}
  margin-right: 10px;

  &.active {
    background-color: #755ef8;
  }
`;

const LoginBtn = styled.div`
  cursor: pointer;
  background-color: white;
  color: #e92b51;
  font-size: 20px;
  border: 2px solid #e92b51;
  padding: 5px;
  transition: all ease-in-out 0.2s;
  text-align: center;
  align-items: center;

  &:hover {
    background-color: #3f3f3f;
  }

  &.active {
    background-color: #3f3f3f;
  }
`;

const Nav = () => {
  // Use global state form reducer
  const [{ LoginPageActive, HomePageActive, ProductPageActive }, dispatch] =
    useStateValue();
  //=================================================================

  const [LoginPageisActive, setLoginPageisActive] = useState(LoginPageActive);
  const [HomePageisActive, setHomePageisActive] = useState(!HomePageActive);
  const [ProductPageisActive, setProductPageisActive] =
    useState(ProductPageActive);

  useEffect(() => {
    // homeClick();
    // loginClick();
    // productClick();
  }, []);

  const loginClick = () => {
    // setLoginPageisActive(true);
    setProductPageisActive(false);
    setHomePageisActive(false);

    dispatch({
      type: 'LOGIN_PAGE_CLICK',
      InLoginPage: true,
      InHomePage: HomePageisActive,
      InProductPage: ProductPageisActive,
    });
  };

  const homeClick = () => {
    // setHomePageisActive(true);
    setProductPageisActive(false);
    setLoginPageisActive(false);

    dispatch({
      type: 'HOME_PAGE_CLICK',
      InHomePage: true,
      InLoginPage: LoginPageisActive,
      InProductPage: ProductPageisActive,
    });
  };

  const productClick = () => {
    // setProductPageisActive(true);
    setHomePageisActive(false);
    setLoginPageisActive(false);

    dispatch({
      type: 'PRODUCT_PAGE_CLICK',
      InProductPage: true,
      InLoginPage: LoginPageisActive,
      InHomePage: HomePageisActive,
    });
  };

  return (
    <div>
      <Navbar>
        <Link to="/">
          <HomeBtn
            onClick={homeClick}
            className={HomePageActive ? 'active' : null}
          >
            Home
          </HomeBtn>
        </Link>

        <Link to="/Products">
          <ProductsBtn
            onClick={productClick}
            className={ProductPageActive ? 'active' : null}
          >
            Products
          </ProductsBtn>
        </Link>
      </Navbar>

      <Link to="/Login">
        <LoginBtn
          onClick={loginClick}
          className={LoginPageActive ? 'active' : null}
        >
          Login
        </LoginBtn>
      </Link>
    </div>
  );
};

export default Nav;
