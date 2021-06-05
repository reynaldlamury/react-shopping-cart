import React from 'react';
import formatCurrency from '../utils';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { motion } from 'framer-motion';

const ProductItem = styled.div`
  background-color: mediumseagreen;
  border-radius: 8px 8px 8px 8px;
  padding: 10px;
  position: relative;
  transition: all ease 0.2s;

  /* z-index: 1; */
  width: 10rem;
  height: 18rem;
  &:hover {
    background-color: teal;
  }

  a {
    display: flex;
    transition: all ease-in-out 0.3s;
    text-decoration: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #29036e;

    &:hover {
      text-decoration: underline;
      color: #bbb8e7;
    }
  }

  img {
    max-height: 220px;
    max-width: 170px;
  }
`;

const Price = styled.div`
  background-color: #e7422f;
  border-radius: 0 0 8px 8px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-weight: bold;
  }
`;

const Button = styled.button`
  font-weight: bold;
  cursor: pointer;
  padding: 0.3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 1px;
  border: 1px solid transparent;
  text-decoration: none;
  background-color: ${(props) => (props.primary ? 'white' : 'black')};
  color: black;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.primary ? 'coral' : 'black')};
    color: white;
    border: 1px solid;
    border-color: ${(props) => (props.primary ? 'white' : 'black')};
  }
`;

export const Product = ({ product }) => {
  const [{ basket }, dispatch] = useStateValue();
  // console.log('this is item in the basket:', basket);

  const addToBasket = () => {
    // dipatch item to the data layer
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        desc: product.description,
      },
    });
  };

  return (
    <li>
      <ProductItem as={motion.div} initial={{ y: 30 }} animate={{ y: 0 }}>
        <a href={`#${product.id}`}>
          <img src={`${product.image}`} alt={product.title}></img>
          <p> {product.title} </p>
        </a>
        <Price>
          <div> {formatCurrency(product.price)} </div>
          <Button primary onClick={addToBasket}>
            Add to cart
          </Button>
        </Price>
      </ProductItem>
    </li>
  );
};
