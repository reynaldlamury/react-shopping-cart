import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// --------------------------------- REDUX
import { connect } from 'react-redux';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import PropTypes from 'prop-types';
// --------------------------------- REDUX

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

const ItemsResult = styled.div`
  background-color: #ff8ef6;
  flex: 2 20rem;
`;
//================================== FORM
const FormWrapper = styled.div`
  background-color: #211e24;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InputText = {
  width: '100%',
  padding: '12px',
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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #361c21;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  width: 900px;
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

const SubmitBtn = styled.div`
  background-color: #04aa6d;
  color: white;
  padding: 12px 20px;
  border: none;
  height: 25px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: #45a049;
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
    margin-bottom: 20px;
    font-size: 30px;
  }

  span {
    font-size: 50px;
    color: crimson;
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

const Footer = styled.div`
  background-color: transparent;
  font-size: 15px;
  color: white;
  padding: 5px;
  margin-top: 40px;
  transform: translateY(60px);

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

//================================== FORM end

const SignUp = (props) => {
  const [CapsLock, setCapsLock] = useState(false);
  const handleCapsLock = (e) => {
    if (e.getModifierState('CapsLock')) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  SignUp.propTypes = {
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
  //------------------------------------------------- handle input

  // ------------------------------------------------ handle name
  const handleNameInput = (e) => {
    setName(e.target.value);
  };
  // ------------------------------------------------ handle name
  // ------------------------------------------------ handle email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  // ------------------------------------------------ handle email
  // ------------------------------------------------ handle password
  const handlePassInput = (e) => {
    setPassword(e.target.value);
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

  console.log('msg:', Msg);

  // ------------------------------------------------ handle onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

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

  return (
    <Main>
      <PostingInterface>
        <PostingForm>
          <FormWrapper>
            <Form>
              <HeaderForm>
                {Msg ? <ErrorMsg>{Msg}</ErrorMsg> : null}
                <h2>
                  <span>S</span>ign Up and start <span>S</span>hopping{' '}
                </h2>
                <Footer>
                  <Terms>
                    By signing up, you agree to our <span>Terms of Use</span>{' '}
                    and <span>Privacy Policy</span>.
                  </Terms>
                  <p>
                    Already have an account?
                    <Link to="/Login">
                      <span>Login</span>
                    </Link>
                  </p>
                </Footer>
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
            </Form>
          </FormWrapper>
        </PostingForm>
      </PostingInterface>
    </Main>
  );
};

// export default SignUp;
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register, clearErrors })(SignUp);
