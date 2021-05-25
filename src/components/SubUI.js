import React, { Component } from 'react';
import styled from 'styled-components';
import formatCurrency from '../utils';

const MainList = styled.ul`
  background-color: tomato;
  color: white;
  list-style-type: none;
  margin-bottom: 10px;
  margin-top: 0;
  z-index: 10;
  padding: 10px;
  padding-top: 0;
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

  p,
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
  flex: auto;
  height: 70px;
`;

export default class SubUI extends Component {
  constructor() {
    super();
    this.count = 1;
  }
  render() {
    return (
      <MainList>
        {this.props.products.map((product) => (
          <li key={product._id} count={product._id[product._id.length - 1]}>
            <Item>
              <Photo>
                <img src={`${product.image}.jpg`} alt={product.title}></img>
              </Photo>
              <Information>
                <h3> {product.title} </h3>
                <p> {product.description} </p>
              </Information>
              <Price> {formatCurrency(product.price)} </Price>
            </Item>
          </li>
        ))}
      </MainList>
    );
  }
}
