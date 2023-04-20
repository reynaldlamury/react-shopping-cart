import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
//--------------------------------- FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinStars } from '@fortawesome/free-regular-svg-icons';
//--------------------------------- FONT AWESOME
// --------------------------------- REDUX
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendEmail } from '../actions/resetPassAction';
// --------------------------------- REDUx

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
  background-color: #ffbdc8;
  border-radius: 8px;
  color: #5e42fc;
  font-weight: bold;
  width: 1316px;
  height: 590px;
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

const Succmsg = styled.h3`
  background-color: #38d807;
  color: white;
  padding: 7px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//================================== FORM end

const ResetPassUI = (props) => {
  const [isTyping, setisTyping] = useState(true);
  const [SuccMsg, setSuccMsg] = useState('this is success msg');
  const [ErrMsg, setErrMsg] = useState('this is error msg');
  const [Email, setEmail] = useState('');

  const { sendEmail } = props;
  ///--------- prev props ------- ///
  const prevError = React.useRef(props.error);
  const prevSuccess = React.useRef(props.success);
  React.useEffect(() => {
    const { error, success } = props;
    if (error !== prevError) {
      // check for register user
      if (error.id === 'SEND_EMAIL_FAIL') {
        setErrMsg(error.msg.msg);
      } else {
        setErrMsg(null);
      }
    }

    if (success !== prevSuccess) {
      // check for register user
      if (success.id === 'EMAIL_SENT') {
        setSuccMsg('Link has been sent to your email');
      } else {
        setSuccMsg(null);
      }
    }
  });
  ///--------- prev props ------- //

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
    setisTyping(false);
  };
  // --------------- handle reset button --------------------- //
  const onResetPass = async (e) => {
    e.preventDefault();
    await sendEmail({ email: Email });
    setisTyping(true);
    console.log(`
    Email: ${Email}
    typeof: ${typeof Email} 
    `);
    console.log('Msg: ', SuccMsg);
  };
  // --------------- handle reset button --------------------- //

  //----------------------------------- prop types ---//
  ResetPassUI.propTypes = {
    sendEmail: PropTypes.func.isRequired,
  };
  //----------------------------------- prop types ---//

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
                <Inside>
                  <label>Email </label>
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleEmailInput}
                  />

                  <SubmitBtn type="submit" onClick={onResetPass}>
                    Reset Password
                  </SubmitBtn>
                </Inside>
                <Footer>
                  {SuccMsg?.length > 0 && !ErrMsg && isTyping && (
                    <Succmsg
                      as={motion.h3}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {SuccMsg}
                      <FontAwesomeIcon
                        // className="icon"
                        icon={faGrinStars}
                        size="2x"
                      ></FontAwesomeIcon>
                    </Succmsg>
                  )}
                  {ErrMsg?.length > 0 && !SuccMsg && isTyping && (
                    <ErrorMsg
                      as={motion.h3}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {ErrMsg}
                    </ErrorMsg>
                  )}
                  <Terms>
                    Link will be sent to your <span>email </span>
                    to reset your password.
                  </Terms>
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

// export default ResetPassUI;
const mapStateToProps = (state) => ({
  error: state.error,
  success: state.success,
});

export default connect(mapStateToProps, { sendEmail })(ResetPassUI);
