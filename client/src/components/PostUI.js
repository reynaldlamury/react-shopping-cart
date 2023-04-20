import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
//--------------------------------- FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
//--------------------------------- REDUX
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
//--------------------------------- REDUX

const WrapperUI = styled.div`
  background-color: transparent;
  position: absolute;
  border-radius: 8px;
  top: 20;
  margin-top: 45px;
  color: white;
  padding: 5px;
  display: block;
  width: 350px;
  height: 200px;
  margin-top: 20;
  transform: translateY(1px);
  transform: translateX(-50px);
  z-index: 5;
`;

const HeaderUI = styled.div`
  display: block;
  position: relative;
  background-color: #3f3f3f;
  color: gold;
  width: 100%;
  z-index: 10;
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
const FormWrapper = styled.div`
  background-color: crimson;
  padding: 5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  /* transform: translateX(-70px); */
`;
const InputText = {
  // position: 'absolute',
  width: '100%',
  padding: '12px',
  boxSizing: 'border-box',
  marginTop: '6px',
  marginBottom: '16px',
  resize: 'vertical',
  fontSize: '16px',
  // height: '20px',
  border: '0',
  borderRadius: '5px',
  fontWeight: 'bold',
  color: '#9a89fc',
  outline: '0',
  backgroundColor: '#6e6b59',
  zIndex: '10',
};

const Form = styled.form`
  background-color: #4d2ff8;
  border-radius: 8px;
  color: gold;
  width: 400px;
  padding: 10px;
  flex: 1 50%;

  input {
    ${InputText}
  }
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
  background-color: transparent;
  padding: 20px;
  border-radius: 8px;
  border: 4px solid #f05267;

  label {
    font-size: 12px;
    z-index: 10; // this has layering effect to ErrorUI
  }

  h4 {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 7px;
    margin-bottom: 0;
    padding: 0;
    /* transform: translateX(80px); */

    p {
      margin: 0;
      padding: 0;
      padding: 8px;
      background-color: crimson;
      color: white;
      border-radius: 5px;
      font-size: 15px;
      width: 100%;
    }
  }
`;

const TextArea = styled.textarea`
  margin-top: 8px;
  line-height: 1.5;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 335px;
  color: crimson;
  font-weight: bold;
  box-shadow: 1px 1px 1px #999;
`;

const PriceInput = styled.input`
  ${InputText}
  border: 2px solid #414040;
  height: 20px;
  position: relative;

  &::placeholder {
    color: #9e9667;
  }

  &.priceCorrect {
    border: 2px solid green;
  }

  &.wrongPrice {
    border: 2px solid red;
  }

  &.price_field_empty {
    border: 2px solid #414040;
  }
`;

const NameInput = styled.input`
  ${InputText}
  border: 2px solid #414040;
  height: 20px;
  position: relative;

  &::placeholder {
    color: #9e9667;
  }

  &.nameCorrect {
    border: 2px solid green;
  }

  &.overLength {
    border: 2px solid red;
  }

  &.name_field_empty {
    border: 2px solid #414040;
  }
`;

const LabelWrap = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  z-index: 10;

  label {
    font-size: 15px;
    font-weight: bold;
  }

  p {
    color: #f36985;
    font-weight: bold;
    font-size: 13px;
    margin-left: 8px;
    margin: 0;

    &.correct {
      color: #61e261;
    }
  }
`;

const FileUpload = styled.input`
  ${InputText}
  height: 50px;
  background-color: #272620;
  border: 0.5px solid #fffc3d8f !important;
  padding: 7px !important;
  cursor: pointer;
  z-index: 10;

  &::file-selector-button {
    cursor: pointer;
    background-color: #ffd900bc;
    color: black;
    font-weight: bold;
    margin-right: 12px;
    padding: 8px;
    outline: none;
    border: 1px solid gold;
    border-radius: 5px;
    transition: all ease-in-out 0.2s;

    &:hover {
      background-color: gold;
    }
  }
`;

const ErrorUI = {
  backgroundColor: 'crimson',
  color: 'white',
  padding: '7px',
  position: 'absolute',
  // bottom: '10',
  zIndex: '1',
  width: '590px',
  height: '31px',
};

const NameErrorUI = styled.div`
  transform: translateY(43px);
  ${ErrorUI}
`;

const PriceErrorUI = styled.div`
  transform: translateY(110px);
  ${ErrorUI};
`;

const RightErrorUI = styled.div`
  background: #4d2ff8;
  color: white;
  padding: 7px;
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  width: 200px;
  display: flex;
  transform: translateX(20px);
  border: 4px solid crimson;

  p {
    display: inline;
    margin-top: 0;
    font-size: 16px;
    margin-left: 10px;
  }

  span {
    color: crimson;
  }
`;

const EmptyFieldError = styled.p`
  background: crimson;
  color: white;
  padding: 3px;
  border: 1px solid white;
`;
//================================== FORM end

const NameErrorUIRight = ({ theError }) => {
  return (
    <div>
      {theError.map((errorMsg) => (
        <NameErrorUI key={errorMsg}>
          <RightErrorUI>
            <span>
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
            {/* name input error*/}
            <p>{errorMsg}</p>
          </RightErrorUI>
        </NameErrorUI>
      ))}
    </div>
  );
};

const PriceErrorUIRight = ({ theError }) => {
  return (
    <div>
      {theError.map((errorMsg) => (
        <PriceErrorUI key={errorMsg}>
          <RightErrorUI>
            <span>
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
            {/* name input error*/}
            <p>{errorMsg}</p>
          </RightErrorUI>
        </PriceErrorUI>
      ))}
    </div>
  );
};

const PostUI = (props) => {
  const [OverLength, setOverLength] = useState(false);
  const [WrongPrice, setWrongPrice] = useState(false);
  const [NameEmpty, setNameEmpty] = useState(true);
  const [PriceEmpty, setPriceEmpty] = useState(true);
  const [wrongPrice] = useState('wrongPrice');
  const [overLength] = useState('overLength');
  const [name_field_empty] = useState('name_field_empty');
  const [price_field_empty] = useState('price_field_empty');
  const [nameCorrect] = useState('nameCorrect');
  const [priceCorrect] = useState('priceCorrect');

  // --------------------------------input
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [Desc, setDesc] = useState('');
  //==================================input
  // let overLength = 'overLength';
  // let empty = 'empty';
  // let correct = 'correct';
  //-------------------------------------- error state
  const [AllFieldEmpty, setAllFieldEmpty] = useState(false);
  const [AllNameFieldErrorArr, setAllNameFieldErrorArr] = useState([]);
  const [AllPriceFieldErrorArr, setAllPriceFieldErrorArr] = useState([]);
  // const [NameErrorResult, setNameErrorResult] = useState('');
  // const [PriceErrorResult, setPriceErrorResult] = useState('');
  // ---------------------------------------------------------- contain error for btn class state
  const [ContainNameError, setContainNameError] = useState(true);
  const [ContainPriceError, setContainPriceError] = useState(true);
  // ---------------------------------------------------------- contain error for btn class state
  // -------------------------------------------------------------- only when button clicked
  const [BtnClicked, setBtnClicked] = useState(false);
  const [BtnForPrice, setBtnForPrice] = useState(false);
  // -------------------------------------------------------------- only when button clicked
  //-------------------------------------- error state
  // ----------------------------------------------------------- show item has beed saved popup
  const [ShowItemSaved, setShowItemSaved] = useState(false);
  // ----------------------------------------------------------- show item has beed saved popup
  const [Msg, setMsg] = useState('');

  ///--------- prev props ------- ///
  const prevSuccess = React.useRef(props.success);
  React.useEffect(() => {
    const { success } = props;
    if (success !== prevSuccess) {
      // check for register user
      if (success.id === 'ITEM_ADDED_SUCCESS') {
        setMsg('Item has been added successfully');
      } else {
        setMsg(null);
      }
    }
  });
  ///--------- prev props ------- ///

  let name_content = '';
  let price_content = '';

  //=============== HANDLE NAME INPUT =============================//
  const handleNameInput = (e) => {
    name_content = e.target.value;
    setName(e.target.value);
    setAllFieldEmpty(false);
    setBtnClicked(false);
    // console.log(Name);
    if (e.target.value.length > 15) {
      setOverLength(true);
      setContainNameError(true);
      setAllNameFieldErrorArr((oldArr) => [
        ...oldArr,
        AllNameFieldErrorArr.indexOf('OverLength') < 0
          ? 'OverLength'
          : setAllNameFieldErrorArr([...AllNameFieldErrorArr]),
      ]);
    } else {
      setOverLength(false);
      setContainNameError(false);
      setAllNameFieldErrorArr([]);
    }

    if (e.target.value.length === 0) {
      setContainNameError(true);
      setNameEmpty(true);
      setAllNameFieldErrorArr((oldArr) => [
        ...oldArr,
        AllNameFieldErrorArr.indexOf('Name should not be empty') < 0
          ? 'Name should not be empty'
          : setAllNameFieldErrorArr([...AllNameFieldErrorArr]),
      ]);
    } else {
      setNameEmpty(false);
    }
  };
  //=============== HANDLE NAME INPUT =============================//

  //=============== HANDLE PRICE INPUT =============================//
  const handlePriceInput = (e) => {
    price_content = e.target.value;
    setPrice(Number(e.target.value));
    setAllFieldEmpty(false);
    // logic for Price Input
    if (isNaN(e.target.value)) {
      setWrongPrice(true);
      setContainPriceError(true);
      setAllPriceFieldErrorArr((oldArr) => [
        ...oldArr,
        AllPriceFieldErrorArr.indexOf('WrongPrice') < 0
          ? 'WrongPrice'
          : setAllPriceFieldErrorArr([...AllPriceFieldErrorArr]),
      ]);
    } else {
      setBtnForPrice(false);
      setContainPriceError(false);
      setAllPriceFieldErrorArr([]);
      setWrongPrice(false);
    }
    if (e.target.value.length === 0) {
      setContainPriceError(true);
      setPriceEmpty(true);
      setAllPriceFieldErrorArr((oldArr) => [
        ...oldArr,
        AllPriceFieldErrorArr.indexOf('Price Should not be empty field') < 0
          ? 'Price Should not be empty field'
          : setAllPriceFieldErrorArr([...AllPriceFieldErrorArr]),
      ]);
    } else {
      setBtnForPrice(false);
      setPriceEmpty(false);
    }
  };
  //=============== HANDLE PRICE INPUT =============================//

  const handleNameBlur = () => {
    if (name_content.length !== 0 && OverLength) {
      setNameEmpty(false);
    }
  };

  const handlePriceBlur = () => {
    if (price_content.length !== 0 && WrongPrice) {
      setNameEmpty(false);
    }
  };

  //////////////////////////=== HANDLE BUTTON CLICK ===///////////////////////
  // click Add Product
  // let NameErrorResult;
  const onClick = async (e) => {
    console.log(AllPriceFieldErrorArr);
    console.log(AllPriceFieldErrorArr);
    console.log(`
    status:
      - Name Field empty: ${NameEmpty} 
      - Name Contain Error: ${ContainNameError}
      - Btn Name Clicked: ${BtnClicked}
      - AllNameFieldError: ${AllNameFieldErrorArr}
      ------------------------------------------
      - Price Field empty: ${PriceEmpty}
      - Price Contain Error: ${ContainPriceError}
      - Btn Price Clicked: ${BtnForPrice}
      - AllPriceFieldError: ${AllPriceFieldErrorArr}
    `);
    e.preventDefault();
    if (NameEmpty) {
      console.log('logic enters first name check');
      setContainNameError(true);
      setAllNameFieldErrorArr((oldArr) => [
        ...oldArr,
        AllNameFieldErrorArr.indexOf('Name Should not be empty field') < 0
          ? 'Name Should not be empty field'
          : setAllNameFieldErrorArr([...AllNameFieldErrorArr]),
      ]);
    }
    if (PriceEmpty) {
      console.log('logic enters first price check');
      setContainPriceError(true);
      setAllPriceFieldErrorArr((oldArr) => [
        ...oldArr,
        AllPriceFieldErrorArr.indexOf('Price Should not be empty field') < 0
          ? 'Price Should not be empty field'
          : setAllPriceFieldErrorArr([...AllPriceFieldErrorArr]),
      ]);
    }
    // -----------------------------------
    // Check if All Fields are not empty --> not allowed
    if (NameEmpty && PriceEmpty) {
      setAllFieldEmpty(true);
      setContainNameError(true);
      setContainPriceError(true);
      setBtnClicked(false);
      setBtnForPrice(false);

      // Check if One of those two fields are empty and doensn't contain errors
      // Check individual fields
    } else if (ContainNameError && !ContainPriceError) {
      setBtnClicked(true);
      console.log('Name contains error');
    } else if (!ContainNameError && ContainPriceError) {
      setBtnForPrice(true);
      console.log('Price contains error');
    } else if (ContainNameError && ContainPriceError) {
      setBtnClicked(true);
      setBtnForPrice(true);
      console.log('Both fields contain error');
    } else if (!ContainNameError && !ContainPriceError) {
      // if logic enters this block, it should be no error at all
      // setItemSaved(<p>Item Saved</p>);
      setShowItemSaved(true);

      const newItem = {
        name: Name,
        price: Price,
        // price: parseInt(Price),
      };
      await props.addItem(newItem);
      setTimeout(() => {
        setShowItemSaved(false);
      }, 6000);
    }
  };
  //////////////////////////=== HANDLE BUTTON CLICK ===///////////////////////

  return (
    <WrapperUI
      as={motion.div}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <Main>
        <PostingInterface>
          <PostingForm>
            <FormWrapper>
              <Form method="post" encType="multipart/form-data">
                <HeaderUI>Posting Items</HeaderUI>
                {AllFieldEmpty && (
                  <EmptyFieldError>Please Enter all Fields</EmptyFieldError>
                )}
                {ContainNameError && BtnClicked && (
                  <NameErrorUIRight
                    theError={AllNameFieldErrorArr}
                  ></NameErrorUIRight>
                )}
                {ContainPriceError && BtnForPrice && (
                  <PriceErrorUIRight
                    theError={AllPriceFieldErrorArr}
                  ></PriceErrorUIRight>
                )}
                <Inside>
                  <LabelWrap>
                    <label>Product&apos;s Name</label>
                    {OverLength && <p>Maximum Character is 15 !</p>}
                    {!OverLength && !NameEmpty && (
                      <p className={'correct'}>Correct</p>
                    )}
                  </LabelWrap>
                  <NameInput
                    type="text"
                    name="name"
                    id="item"
                    required
                    // onChange={nameOnChange}
                    className={classNames({
                      overLength: OverLength,
                      name_field_empty: NameEmpty,
                      nameCorrect: !OverLength,
                    })}
                    onInput={handleNameInput}
                    placeholder="Product's name"
                    onBlur={handleNameBlur}
                  ></NameInput>

                  <LabelWrap>
                    <label>Price</label>
                    {WrongPrice && <p>Not A correct Number</p>}
                    {!WrongPrice && !PriceEmpty && (
                      <p className={'correct'}>Correct</p>
                    )}
                  </LabelWrap>
                  <PriceInput
                    className={classNames({
                      wrongPrice: WrongPrice,
                      price_field_empty: PriceEmpty,
                      priceCorrect: !WrongPrice,
                    })}
                    onInput={handlePriceInput}
                    placeholder="Price"
                    onBlur={handlePriceBlur}
                  ></PriceInput>

                  <LabelWrap>
                    <label>Add Picture</label>
                  </LabelWrap>
                  <FileUpload type="file" id="file" name="file"></FileUpload>

                  <LabelWrap>
                    <label>Add Description</label>
                  </LabelWrap>
                  <TextArea
                    defaultValue="Write 
                  Description of your product... 
                  "
                  ></TextArea>

                  <SubmitBtn
                    className={
                      !ContainNameError &&
                      !ContainPriceError &&
                      !NameEmpty &&
                      !PriceEmpty
                        ? null
                        : 'notAllowed'
                    }
                    type="submit"
                    onClick={onClick}
                  >
                    <p>Add Item</p>
                    <span
                      className={
                        !ContainNameError &&
                        !ContainPriceError &&
                        !NameEmpty &&
                        !PriceEmpty
                          ? 'allowed'
                          : null
                      }
                    >
                      ...
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </span>
                  </SubmitBtn>
                  <AnimatePresence>
                    <motion.h4 exit={{ y: -1000 }}>
                      {ShowItemSaved && Msg && <p> {Msg} </p>}
                    </motion.h4>
                  </AnimatePresence>
                </Inside>
              </Form>
            </FormWrapper>
          </PostingForm>
          <ItemsResult></ItemsResult>
        </PostingInterface>
      </Main>
    </WrapperUI>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  success: state.success,
});
// export default PostUI;
export default connect(mapStateToProps, { addItem })(PostUI);
