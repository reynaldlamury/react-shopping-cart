import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
//--------------------------------- FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinStars } from '@fortawesome/free-regular-svg-icons';
//--------------------------------- FONT AWESOME
// --------------------------------- REDUX
import { connect } from 'react-redux';
import { resetPassword } from '../actions/resetPassAction';
import { clearErrors } from '../actions/errorActions';
import { useHistory } from 'react-router-dom';
// --------------------------------- REDUX
// import { Redirect } from 'react-router-dom';

//================================== style start
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
  transform: translate(-5px, -40px);
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #251f20;
  border-radius: 8px;
  color: #5e42fc;
  font-weight: bold;
  width: 1316px;
  height: 590px;
  padding: 20px;

  h3 {
    span {
      font-weight: bold;
      color: #8c78fc;
    }
  }

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

const SubmitBtn = styled.button`
  background-color: #04aa6d !important;
  color: white !important;
  padding: 10px 7px;
  border: none;
  border-radius: 4px;
  width: 100%;
  margin: 0;
  margin-top: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

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
  background-color: #251f20;
  padding: 10px;
  border-radius: 8px;
  width: 450px;
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
    margin: 0;
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

const ErrorMsg = styled.h3`
  background-color: crimson;
  color: white;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Reset = styled.h3`
  background-color: #38d807;
  color: white;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
  border-radius: 0px 10px 10px 0px;

  p {
    cursor: pointer;
    padding: 3px;
    padding-right: 8px;
    padding-left: 8px;
    background-color: crimson;
    height: 50px;
    position: absolute;
    transform: translateX(-190px);
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 0 10px;

    &:hover {
      background-color: #b90529;
    }
  }
`;

//================================== FORM end

const NewPassPage = (props) => {
  const [CapsLock, setCapsLock] = useState(false);
  const [Data, setData] = useState({});
  const { match, resetPassword, clearErrors } = props;

  useEffect(() => {
    console.log('render new pass page ...');
    const fetchItem = async () => {
      const res = await axios.get(
        `/api/forgot-password/${match.params.id}/${match.params.token}`,
      );
      setData(res.data);
    };
    fetchItem();
  }, []);
  console.log('Data:', Data);

  const handleCapsLock = (e) => {
    if (e.getModifierState('CapsLock')) return setCapsLock(true);
    return setCapsLock(false);
  };

  ///--------- prev props ------- ///
  const prevError = React.useRef(props.error);
  const prevSuccess = React.useRef(props.success);
  React.useEffect(() => {
    const { error, success } = props;
    if (error !== prevError) {
      // check for register user
      if (error.id === 'RESET_PASSWORD_FAIL') {
        setErrMsg(error.msg.msg);
      } else {
        setErrMsg(null);
      }
    }

    if (success !== prevSuccess) {
      // check for register user
      if (success.id === 'RESET_PASSWORD_SUCCESS') {
        setSuccMsg('Your password has been reset');
      } else {
        setSuccMsg(null);
      }
    }
  });
  ///--------- prev props ------- /

  // --------------- password input --------------------------- //
  const [NewPass, setNewPass] = useState('');
  const [ConfirmPass, setConfirmPass] = useState('');
  const [isTyping, setisTyping] = useState(true);
  const [SuccMsg, setSuccMsg] = useState('this is success msg');
  const [ErrMsg, setErrMsg] = useState('this is error msg');

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
    setisTyping(false);
    if (ErrMsg) clearErrors();
  };

  const handleConfirmPass = (e) => {
    setConfirmPass(e.target.value);
    setisTyping(false);
    if (ErrMsg) clearErrors();
  };

  let history = useHistory();
  const onReset = async (e) => {
    e.preventDefault();
    setisTyping(true);

    // -------------------------
    if (!ErrMsg) {
      await resetPassword({
        pass1: NewPass,
        pass2: ConfirmPass,
        id: match.params.id,
        token: match.params.token,
      });
      console.log('reset pass success');
    }
  };
  // --------------- password input --------------------------- //
  const handleBottomLogin = () => {
    history.push('/login');
  };

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
              <Form method="POST">
                <HeaderForm>
                  <FontAwesomeIcon
                    // className="icon"
                    icon={faGrinStars}
                    size="5x"
                  ></FontAwesomeIcon>
                  {/* <h2>Forgot Password</h2> */}
                </HeaderForm>
                <h3>
                  Reset Password for{' '}
                  <span> {Data ? Data.email : 'Invalid Token'} </span>{' '}
                </h3>
                <Inside>
                  <label>
                    New Password {CapsLock && <p>Your CAPS LOCK is on !</p>}
                  </label>
                  <input
                    placeholder="New Password"
                    type="password"
                    name="password"
                    id="password1"
                    onChange={handleNewPass}
                    onKeyUp={handleCapsLock}
                    onBlur={() => setCapsLock(false)}
                  />
                  <label>
                    Confirm Password {CapsLock && <p>Your CAPS LOCK is on !</p>}
                  </label>
                  <input
                    placeholder="Confirm Password"
                    type="password"
                    name="email"
                    id="password2"
                    onChange={handleConfirmPass}
                    onKeyUp={handleCapsLock}
                    onBlur={() => setCapsLock(false)}
                  />

                  <SubmitBtn type="submit" onClick={onReset}>
                    Reset Password
                  </SubmitBtn>
                </Inside>
                <Footer>
                  {SuccMsg && !ErrMsg && isTyping && (
                    <Reset
                      as={motion.h3}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      <p onClick={handleBottomLogin}>Login</p> {SuccMsg}
                      <FontAwesomeIcon
                        // className="icon"
                        icon={faGrinStars}
                        size="2x"
                      ></FontAwesomeIcon>
                    </Reset>
                  )}
                  {ErrMsg && !SuccMsg && isTyping ? (
                    <ErrorMsg
                      as={motion.h3}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {ErrMsg}
                    </ErrorMsg>
                  ) : null}
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

// export default ProductDetail;
const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
  success: state.success,
});

export default connect(mapStateToProps, { resetPassword, clearErrors })(
  NewPassPage,
);
