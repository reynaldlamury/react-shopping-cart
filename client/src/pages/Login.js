import React, { useState } from 'react';
import styled from 'styled-components';
import { faGrinStars } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link, useHistory, useLocation } from 'react-router-dom';
// --------------------------------- CONTEXT API
import { useStateValue } from '../StateProvider';
// --------------------------------- CONTEXT API
// --------------------------------- REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { loadUser } from '../actions/authActions';
// --------------------------------- REDUX
// import { Redirect } from 'react-router-dom';

const Main = styled.main`
  grid-area: 'main';
  background-color: coral;
`;

const PostingInterface = styled.div`
  background-color: #b0ff49;
  display: flex;
`;

const PostingForm = styled.div`
  position: relative;
  background-color: #5ef8f0;
  flex: 3 50rem;
`;

//================================== FORM
const FormWrapper = styled.div`
  background-color: #211e24;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InputText = {
  width: '100%',
  padding: '12px',
  // border: '0',
  // bordeBottom: '3px',
  borderRadius: '4px',
  boxSizing: 'border-box',
  marginTop: '6px',
  marginBottom: '16px',
  resize: 'vertical',
  outline: '0',
  fontSize: '20px',
  color: '#6359ec',
};

const Form = styled.div`
  /* inner form */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: crimson;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  width: 400px;
  padding: 20px;

  // input email & password
  input {
    border: 0;
    transition: all ease-in-out 0.2s;
    border-bottom: 4px solid #2b2a35;
    background-color: #1c191f;
    ${InputText}

    &:focus {
      border-bottom: 4px solid #5e42fc;
    }

    &::placeholder {
      font-size: 12px;
    }
  }
`;

const SubmitBtn = styled.button`
  cursor: pointer;
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  width: 100%;
  justify-content: center;
  text-align: center;
  align-items: center;
  transition: all ease-in-out 0.2s;
  font-size: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const HeaderForm = styled.div`
  background-color: crimson;
  padding: 20px;
  padding-top: 0;
  display: flex;
  transform: translateX(-10px);
  transition: all ease-in-out 0.2s;
`;

const Inside = styled.div`
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  border: 4px solid #dd4564;

  p {
    display: inline;
    color: gold;
    font-size: 12px;
  }
`;

const Footer = styled.div`
  background-color: transparent;
  font-size: 15px;
  color: white;
  padding: 5px;

  &:link {
    color: #00c531;
  }

  span {
    color: #8e7cf5;
    text-decoration: none;
    padding-left: 2.5px;
    font-weight: bold;
    font-size: 17px;
  }
`;
const ErrorMsg = styled.h3`
  background-color: crimson;
  color: white;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  align-items: center;
`;
//================================== FORM end

const Login = (props) => {
  const [CapsLock, setCapsLock] = useState(false);
  // ===================== PATH ======== context api =============== //
  const [{ basket, currentPath }, dispatch] = useStateValue();
  const location = useLocation();
  React.useEffect(() => {
    dispatch({
      type: 'GET_CURRENT_PATH',
      payload: location.pathname,
    });
  }, []);
  console.log('currentPath', currentPath);
  // ==================== PATH ==================================== //

  const handleCapsLock = (e) => {
    if (e.getModifierState('CapsLock')) return setCapsLock(true);
    return setCapsLock(false);
  };

  //------------------------------------------------- handle input
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Msg, setMsg] = useState(null);
  const [isTyping, setisTyping] = useState(true);
  //------------------------------------------------- handle input

  // ------------------------------------------------ handle email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setisTyping(false);
    if (Msg) props.clearErrors();
  };
  // ------------------------------------------------ handle email
  // ------------------------------------------------ handle password
  const handlePassInput = (e) => {
    setPassword(e.target.value);
    setisTyping(false);
    if (Msg) props.clearErrors();
  };

  // ------------------------------------------------ handle pas swor d
  // const { isAuthenticated } = props.auth;
  let history = useHistory();
  // =============== LOGIN ===================== //
  const onSubmit = async (e) => {
    e.preventDefault();
    setisTyping(true);
    // Create user object
    const user = {
      email: Email,
      password: Password,
      cart_items: basket,
    };

    // Register newUser
    if (!Msg) await props.login(user);

    console.log(Msg);
    if (props.auth.isAuthenticated) {
      await history.push('/');

      props.loadUser();
    }
  };

  if (props.auth.isAuthenticated) history.push('/');
  console.log(props.auth.isAuthenticated);
  // =============== LOGIN ===================== //

  ///--------- prev props ------- ///
  const prevError = React.useRef(props.error);
  React.useEffect(() => {
    const { error } = props;
    if (error !== prevError) {
      // check for register user
      if (error.id === 'LOGIN_FAIL') return setMsg(error.msg.msg);
      return setMsg(null);
    }
  });

  // if (isAuthenticated) return <Redirect to="/"></Redirect>;
  ///--------- prev props ------- ///
  //----------------------------------- prop types ---//
  Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    // clearErrors: PropTypes.func.isRequired,
  };
  //----------------------------------- prop types ---//

  return (
    <Main>
      <PostingInterface>
        <PostingForm>
          <FormWrapper>
            <Form>
              <HeaderForm>
                <FontAwesomeIcon
                  // className="icon"
                  icon={faGrinStars}
                  size="3x"
                ></FontAwesomeIcon>
                {Msg && isTyping ? (
                  <ErrorMsg
                    as={motion.h3}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    {Msg}
                  </ErrorMsg>
                ) : null}
              </HeaderForm>
              <Inside>
                <label>Email </label>
                <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleEmailInput}
                />

                <label>
                  Password {CapsLock && <p>Your CAPS LOCK is on !</p>}
                </label>
                <input
                  placeholder="Password"
                  type="password"
                  id="password"
                  name="password"
                  onKeyUp={handleCapsLock}
                  onChange={handlePassInput}
                  onBlur={() => setCapsLock(false)}
                />

                <SubmitBtn onClick={onSubmit}>Login</SubmitBtn>
              </Inside>
              <Footer>
                <p>
                  Don&apos;t have an account?
                  <Link to="/SignUp">
                    <span>Sign Up</span>
                  </Link>
                </p>
                <Link to="/forgot-password">
                  <p>Forgot Password</p>
                </Link>
              </Footer>
            </Form>
          </FormWrapper>
        </PostingForm>
      </PostingInterface>
    </Main>
  );
};

// export default Login;
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, { login, loadUser, clearErrors })(
  Login,
);
