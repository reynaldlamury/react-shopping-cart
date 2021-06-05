import React, { useState } from 'react';
import styled from 'styled-components';
import formatCurrency from '../utils';

const Desclook = styled.div`
  background-color: #ffe91e;
  color: #353535;
  font-weight: bold;
  padding: 2px;
  transition: all ease-in-out 0.2s;

  div {
    transition: all ease-in-out 0.2s;
    margin: 5px;
    padding: 5px;
    cursor: pointer;
    background-color: #a7ff5f;
    border-radius: 10;

    &:hover {
      background-color: #73deff;
    }

    &.active {
      background-color: #73deff;
    }
  }
`;

const Item = styled.div`
  background-color: #b1b100;
  display: flex;
  align-items: center;
  margin: 8px;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 10px;
  transition: all ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #e7e700;
  }

  img {
    width: 35px;
    height: 55px;
    margin-bottom: 10px;
  }
`;

const Photo = styled.div`
  background-color: blue;
`;

const Information = styled.div`
  flex: 2 50px;
  background-color: chocolate;
  color: white;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  font-size: 15px;

  h3 {
    margin: 10px;
    padding: 0;
  }
`;

const Price = styled.div`
  background-color: grey;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  padding: 4px;
  flex: auto;
  height: 70px;
`;

const Description = styled.p`
  margin: 10px;
  padding: 0;
  transition: all 0.3s ease-in-out;

  &.content {
    height: 0;
    overflow: hidden;
  }

  &.showContent {
    height: 70px;
    overflow-y: scroll;
  }
`;

export const SearchProduct = ({ product }) => {
  const [descStatus, setdescStatus] = useState(false);

  const handleDesc = () => {
    setdescStatus(!descStatus);
  };

  return (
    <li>
      <Item>
        <Photo>
          <img src={`${product.productImg}`} alt={product.productTitle}></img>
        </Photo>
        <Information>
          <h3> {product.productTitle} </h3>
          <Desclook>
            <div className={descStatus ? 'active' : null} onClick={handleDesc}>
              {descStatus ? 'Close' : 'See Desc ...'}
            </div>
          </Desclook>
          <Description
            className={descStatus ? 'showContent content' : 'content'}
          >
            {product.productDesc}
          </Description>
        </Information>
        <Price> {formatCurrency(product.productPrice)} </Price>
      </Item>
    </li>
  );
};
