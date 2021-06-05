import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import styled from 'styled-components';
import SideCartItem from './SideCartItem';
import { CustomScroll } from '../StyledGlobal';
import { AnimatePresence, motion } from 'framer-motion';
import formatCurrency from '../utils';
import { getBasketTotal } from '../reducer';
import { Modals } from './Modals';

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

const SideCart = () => {
  const [{ basket, isExist }] = useStateValue();
  let exist = isExist;
  // const [Status, setStatus] = useState(isExist);

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

      <p>Cart Items: {basket.length} </p>
      <div style={customStyle}>
        Total Price:
        <PriceTotal
          as={motion.p}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {formatCurrency(getBasketTotal(basket))}
        </PriceTotal>
      </div>
      {basket.length > 0 && (
        <MainCart>
          {basket.map((product) => (
            <SideCartItem
              key={product.id}
              product={product}
              basket={basket}
            ></SideCartItem>
          ))}
        </MainCart>
      )}
    </div>
  );
};

export default SideCart;
