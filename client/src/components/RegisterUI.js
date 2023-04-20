import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
//--------------------------------- FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinStars } from '@fortawesome/free-regular-svg-icons';
// --------------------------------- REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
// --------------------------------- REDUX
// --------------------------------- CONTEXT API
import { useStateValue } from '../StateProvider';
// --------------------------------- CONTEXT API

const WrapperUI = styled.div`
  background-color: transparent;
  position: absolute;
  border-radius: 8px;
  top: 20;
  margin-top: 45px;
  color: white;
  padding: 5px;
  display: block;
  width: 450px;
  height: 200px;
  margin-top: 20;
  transform: translateY(1px);
  transform: translateX(-10px);
  z-index: 5;
`;

//=============================================== body

const Main = styled.main`
  grid-area: 'main';
  background-color: coral;
  border-radius: 8px;
  z-index: 10;
  transform: translateX(-155px);
`;

const PostingInterface = styled.div`
  background-color: #b0ff49;
  border-radius: 8px;
  display: flex;
  z-index: 10;
`;

const PostingForm = styled.div`
  position: relative;
  background-color: #5ef8f0;
  border-radius: 8px;
  flex: 3 50%;
  z-index: 10;
`;

const ItemsResult = styled.div`
  background-color: #ff8ef6;
  flex: 2 50%;
  z-index: 10;
`;
//================================== FORM
const InputText = {
  // position: 'absolute',
  width: '100%',
  padding: '12px',
  boxSizing: 'border-box',
  marginTop: '6px',
  marginBottom: '16px',
  resize: 'vertical',
  fontSize: '18px',
  // height: '20px',
  border: '0',
  borderRadius: '5px',
  fontWeight: 'bold',
  color: '#9a89fc',
  outline: '0',
  backgroundColor: '#6e6b59',
  zIndex: '10',
};

const Form = styled.div`
  /* inner form */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffbdc8;
  border-radius: 8px;
  color: #5e42fc;
  font-weight: bold;
  width: 900px;
  padding: 20px;

  // input email & password
  input {
    border: 0;
    transition: all ease-in-out 0.2s;
    border-bottom: 4px solid #2b2a35 !important;
    background-color: #1c191f;
    ${InputText}

    &:focus {
      border-bottom: 4px solid #5e42fc !important;
    }

    &::placeholder {
      font-size: 12px;
    }
  }
`;

const FormWrapper = styled.div`
  background-color: crimson;
  padding: 5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const SubmitBtn = styled.div`
  background-color: #04aa6d !important;
  color: white !important;
  padding: 10px 7px;
  border: none;
  border-radius: 4px;
  width: 95%;
  margin: 0;
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: inline;
    color: crimson;
    visibility: visible;

    &.allowed {
      visibility: hidden;
    }
  }

  p {
    margin: 0;
    padding: 0;
  }

  &.notAllowed {
    background-color: grey !important;
    color: #b4b4b4;

    &:hover {
      background-color: #757575 !important;
    }
  }

  &:hover {
    background-color: #45a049 !important;
  }
`;

const Inside = styled.div`
  flex: 2 350px;
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  border: 4px solid #dd4564;

  label {
    font-size: 20px;
  }

  p {
    display: inline;
    color: gold;
    font-size: 12px;
  }
`;

const HeaderForm = styled.div`
  background-color: transparent;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  transform: translateX(-10px);
  flex: 1 200px;

  h2 {
    flex: 1 100px;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 30px;
  }

  span {
    font-size: 50px;
    color: crimson;
  }
`;

const Footer = styled.div`
  background-color: transparent;
  font-size: 15px;
  color: #5e42fc;
  padding: 5px;
  margin: 0;
  transform: translateY(0px);

  span {
    color: crimson;
    text-decoration: none;
    padding-left: 5px;
    font-weight: bold;
    font-size: 17px;
  }
`;

const Terms = styled.p`
  font-size: 12px;
  padding: 7px;
  background-color: #211e24;
  border-radius: 7px;

  span {
    font-size: 12px;
    padding: 0;
  }
`;

const ErrorMsg = styled.h3`
  background-color: crimson;
  color: white;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Registered = styled.h3`
  background-color: #38d807;
  color: white;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//================================== FORM end

const RegisterUI = (props) => {
  const { isAuthenticated } = props;
  const [CapsLock, setCapsLock] = useState(false);
  const handleCapsLock = (e) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  RegisterUI.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  //------------------------------------------------- handle input
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Msg, setMsg] = useState(null);
  const [isTyping, setisTyping] = useState(true);
  //------------------------------------------------- handle input

  // ------------------------------------------------ handle name
  const handleNameInput = (e) => {
    setName(e.target.value);
    setisTyping(false);
    if (Msg) props.clearErrors();
  };
  // ------------------------------------------------ handle name
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
  // ------------------------------------------------ handle password
  ///--------- prev props ------- ///
  const prevError = React.useRef(props.error);
  React.useEffect(() => {
    const { error } = props;
    if (error !== prevError) {
      // check for register user
      if (error.id === 'REGISTER_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }
  });
  ///--------- prev props ------- ///

  // ------------------------------------------------ handle onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    setisTyping(true);

    // Create user object
    const newUser = {
      name: Name,
      email: Email,
      password: Password,
    };

    // Register newUser
    props.register(newUser);
  };
  // ------------------------------------------------ handle onSumbit
  // ----------------------- - (context API) ------------------------ //
  const [{ registerUI }, dispatch] = useStateValue();
  const [RegUI, setRegUI] = useState(registerUI);
  // ----------------------- - (context API) ------------------------ /
  // ------------------------------------------------ handle onClick
  const handleClick = () => {
    setRegUI(!RegUI);
    dispatch({
      type: 'REGISTER_UI_CLICK',
      payload: !RegUI,
    });
  };
  // ------------------------------------------------ handle onClick

  return (
    <WrapperUI
      as={motion.div}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Main>
        <PostingInterface>
          <PostingForm>
            <FormWrapper>
              <Form method="post">
                <HeaderForm>
                  <FontAwesomeIcon
                    // className="icon"
                    icon={faGrinStars}
                    size="5x"
                  ></FontAwesomeIcon>
                  <h2>
                    <span>S</span>ign Up
                  </h2>
                </HeaderForm>
                <Inside>
                  <label>Full Name </label>
                  <input
                    placeholder="Full Name"
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleNameInput}
                  />

                  <label>Email </label>
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleEmailInput}
                  />

                  <label>
                    Password {CapsLock && <p>Your CAPS LOCK is on !</p>}
                  </label>
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                    onKeyUp={handleCapsLock}
                    onChange={handlePassInput}
                    onBlur={() => setCapsLock(false)}
                  />

                  <SubmitBtn onClick={onSubmit}>Sign Up</SubmitBtn>
                </Inside>
                <Footer>
                  {isAuthenticated && isTyping && (
                    <Registered>
                      You are registered !
                      <FontAwesomeIcon
                        // className="icon"
                        icon={faGrinStars}
                        size="2x"
                      ></FontAwesomeIcon>
                    </Registered>
                  )}
                  {Msg && isTyping ? (
                    <ErrorMsg
                      as={motion.h3}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {Msg}
                    </ErrorMsg>
                  ) : null}
                  <Terms>
                    By signing up, you agree to our <span>Terms of Use</span>{' '}
                    and <span>Privacy Policy</span>.
                  </Terms>
                  <p>
                    Already have an account?
                    <Link to="/Login" onClick={handleClick}>
                      <span>Login</span>
                    </Link>
                  </p>
                </Footer>
              </Form>
            </FormWrapper>
          </PostingForm>
          <ItemsResult></ItemsResult>
        </PostingInterface>
      </Main>
    </WrapperUI>
  );
};

// export default RegisterUI;
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterUI);
