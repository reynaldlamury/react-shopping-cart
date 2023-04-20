import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { useStateValue } from '../StateProvider';
import PostUI from './PostUI';
import RegisterUI from './RegisterUI';
import classNames from 'classnames';
import { useHistory } from 'react-router';
// ------------------------------------------------ redux
import { clearErrors } from '../actions/errorActions';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import ResetPassUI from './ResetPassUI';
import { Redirect } from 'react-router-dom';

const Navbar = styled.div`
  background-color: salmon;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateX(-150px);
`;

const Btn = css`
  cursor: pointer;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
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
  flex: 1 100px;
  width: 100px;
  transform: translateX(-150px);

  &:hover {
    background-color: #3f3f3f;
  }

  &.active {
    background-color: rgb(63, 63, 63);
  }
`;

const Welcome = styled.div`
  ${Btn}
  transition: none;
  border: none;
  transform: translate(20px, -50px);
  pointer-events: none;

  span {
    font-weight: bold;
    color: #d10034;
  }
`;

const RegisterBtn = styled.div`
  ${Btn}
  background-color: crimson;
  color: white;
  transform: translate(80px, -40px);

  &.active {
    background-color: #111111;
  }

  &.turnedOff {
    pointer-events: none;
  }

  p {
    transform: translateY(5px);
    margin: 0;
    margin-bottom: 10px;
  }

  &:hover {
    background-color: #111111;
  }
`;

const LogoutBtn = styled.div`
  ${Btn}
  height: 20px;
  transform: translate(285px, -30px);

  p {
    transform: translateY(5px);
    margin: 0;
    margin-bottom: 10px;
    font-size: 17px;
  }

  &:hover {
    background-color: #d10034;
  }
`;

const PostBtn = styled.div`
  ${Btn}
  background-color: #3f3f3f;
  color: gold;
  width: 100px;
  height: 27px;
  text-align: center;
  align-items: center;
  border: 2px solid gold;
  z-index: 1;
  transition: all ease-in-out 0.2s;
  transform: translateX(-150px);

  &.active {
    background-color: #111111;
  }

  &.turnedOff {
    pointer-events: none;
  }

  p {
    transform: translateY(5px);
    margin: 0;
    margin-bottom: 10px;
  }

  &:hover {
    background-color: #111111;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;
//======================================== Styling

const Nav = (props) => {
  // ======================== (context API) ========================= //
  const [{ currentPath }, dispatch] = useStateValue();
  // ======================== (context API) ========================= //

  ////--------------------------------------proptyes------------------
  RegisterUI.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };
  ////-----------------------------------------------------------------

  // ========================== handle UI button ========================== //
  const [PostUIisActive, setPostUIisActive] = useState(false);
  const [RegisterUIisActive, setRegisterUIisActive] = useState(false);
  const [ResetPassUIisActive, setResetPassUIisActive] = useState(true);
  const handlePostUI = () => {
    setPostUIisActive(!PostUIisActive);

    dispatch({
      type: 'POST_UI_CLICK',
      UIActive: !PostUIisActive,
    });
  };

  const handleRegisterUI = () => {
    setRegisterUIisActive(!RegisterUIisActive);
    props.clearErrors();

    dispatch({
      type: 'REGISTER_UI_CLICK',
      UIActive: !RegisterUIisActive,
    });
  };
  // ========================== handle UI button ========================== //

  // let history = useHistory();
  const handleLogout = async () => {
    await props.logout();
    // history.push('/login');
    return <Redirect exact to="/login" />;
  };

  // ------------------------------------ authenticatation
  const { isAuthenticated, user } = props.auth;
  // ------------------------------------ authenticatation

  return (
    <div>
      <Navbar>
        <Link to="/">
          <HomeBtn className={currentPath === '/' ? 'active' : null}>
            Home
          </HomeBtn>
        </Link>

        <Link to="/Products">
          <ProductsBtn>Products</ProductsBtn>
        </Link>
      </Navbar>
      <Wrapper>
        {!user && (
          <Link to="/login">
            <LoginBtn className={currentPath === '/login' ? 'active' : null}>
              Login
            </LoginBtn>
          </Link>
        )}
        {props.auth.isAuthenticated && (
          <PostBtn
            // className={PostUIisActive ? 'active' : null}
            className={classNames({
              active: PostUIisActive,
              turnedOff: RegisterUIisActive,
            })}
            onClick={handlePostUI}
          >
            {/* <div>Posting p</div> */}
            <p>Posting</p>
          </PostBtn>
        )}
        {!user && (
          <RegisterBtn
            // className={RegisterUIisActive ? 'active' : null}
            className={classNames({
              active: RegisterUIisActive,
              turnedOff: PostUIisActive,
            })}
            onClick={handleRegisterUI}
          >
            {/* <div>Posting p</div> */}
            <p>Register</p>
          </RegisterBtn>
        )}
        {isAuthenticated && (
          <LogoutBtn onClick={handleLogout}>
            {/* <div>Posting p</div> */}
            <p>Logout</p>
          </LogoutBtn>
        )}
        {RegisterUIisActive && !user && <RegisterUI />}
        {/* {ResetPassUIisActive && <ResetPassUI />} */}
        {PostUIisActive && <PostUI />}
        <Welcome>
          {user && (
            <p>
              Welcome <span> {user.name} </span>
            </p>
          )}
        </Welcome>
      </Wrapper>
    </div>
  );
};

// export default Nav;
const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, { clearErrors, logout })(Nav);
