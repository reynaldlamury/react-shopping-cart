import React from 'react';
import styled from 'styled-components';
import formatCurrency from '../utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useStateValue } from '../StateProvider';

const ItemWrapper = styled.div`
  background-color: #f1b76b;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const MainInfo = styled.div`
  background-color: #98d9db;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;

  img {
    width: 30px;
    height: 55px;
  }

  p {
    background-color: #a8b5f0;
    padding: 10px;
  }
`;

const TotalSection = styled.div`
  background-color: #ee4365;
  color: white;
  padding: 4px;
`;

const RemoveSection = styled.div`
  cursor: pointer;
  background-color: #9bdd00;
  border-radius: 0 0 8px 8px;
  color: crimson;
  padding: 2px;
  font-size: 15px;
  transition: all ease 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    background-color: #beff28;
  }

  span {
    flex: 1 5px;
    font-size: 25px;
  }

  p {
    flex: 2 15px;
    margin: 0;
    padding: 0;
    width: 20px;
    font-size: 15px;
    font-weight: bold;
  }
`;

const SideCartItem = ({ product }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    // Remove item from the basket
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: product.id,
    });
  };

  return (
    <AnimatePresence>
      <ItemWrapper
        as={motion.div}
        initial={{ x: -70 }}
        animate={{ color: '#481fff', x: 0 }}
        exit={{ x: -70 }}
      >
        <MainInfo>
          <img src={product.image} alt={product.title} />
          <p>
            price: <strong>{formatCurrency(product.price)}</strong>{' '}
          </p>
        </MainInfo>
        <TotalSection>Total: -</TotalSection>
        <RemoveSection onClick={removeFromBasket}>
          <p>Remove Item</p>
          <span>
            <strong>x</strong>
          </span>
        </RemoveSection>
      </ItemWrapper>
    </AnimatePresence>
  );
};

export default SideCartItem;
