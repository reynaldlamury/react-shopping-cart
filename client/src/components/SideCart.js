import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CustomScroll } from '../StyledGlobal';
import { Modals } from './Modals';
import { AnimatePresence, motion } from 'framer-motion';
// ===================  COMPONENTS ===================== //
import SideCartItem from './SideCartItem';
// ===================  COMPONENTS ===================== //
// ===================  CONTEXT API ===================== //
import formatCurrency from '../utils';
import { useStateValue } from '../StateProvider';
// ===================  CONTEXT API ===================== //
// ====================================== REDUX
import { connect } from 'react-redux';
// ====================================== REDUX

const MainCart = styled.div`
  background-color: #3737fd;
  padding: 10px;
  max-height: 500px;
  overflow-y: scroll;

  ${CustomScroll}
`;

const PriceTotal = styled.p`
  background-color: #ff597a;
  border-radius: 8px;
  color: white;
  padding: 3px;
  margin: 0;
`;

const customStyle = {
  backgroundColor: 'crimson',
  margin: '5px',
  padding: '5px',
  color: 'white',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
};

const PopUp = styled.div`
  ${customStyle}
  background-color: #eaff29;
  color: #ff4a4a;
  flex-direction: column;
  font-weight: bold;
  font-size: 15px;
`;

// end of style section
// ==================================================================================

const SideCart = ({ auth }) => {
  const [{ basket, isExist }] = useStateValue();
  let exist = isExist;
  // const [Status, setStatus] = useState(isExist);
  const getCartTotal = (cart) => {
    return cart.reduce((sum, cart) => sum + cart.price, 0);
  };

  useEffect(() => {
    setTimeout(() => {
      exist = false;
    }, 200);
  }, [exist]);

  return (
    <div>
      {exist && (
        <AnimatePresence>
          <PopUp
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ x: -1000, opacity: 0 }}
          >
            The item is already exist
            <Modals></Modals>
          </PopUp>
        </AnimatePresence>
      )}
      <p> isExist: {isExist.toString()} </p>
      <p> exist : {exist.toString()} </p>

      <p>Cart Items: {auth.cart.length} </p>
      <div style={customStyle}>
        Total Price:
        <PriceTotal
          as={motion.p}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {formatCurrency(getCartTotal(auth.cart))}
        </PriceTotal>
      </div>
      {auth.cart?.length > 0 && (
        <MainCart>
          {auth.cart.map((basketItem) => (
            <SideCartItem
              key={basketItem._id}
              product={basketItem}
              basket={basket}
            ></SideCartItem>
          ))}
        </MainCart>
      )}
    </div>
  );
};

// export default SideCart;
const mapStateToProps = (state) => ({
  auth: state.auth.user,
});

export default connect(mapStateToProps)(SideCart);
