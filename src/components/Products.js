import React, { Component } from 'react';
import styled from 'styled-components';
import formatCurrency from './utils';

const WrapperList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  list-style-type: none;
  background-color: blueviolet;

  li {
    flex: 1 1 29rem;
    height: 47rem;
    padding: 1rem;
    margin: 1rem;
  }
`;

const ProductItem = styled.div`
  background-color: mediumseagreen;
  padding: 10px;
  position: relative;
  transition: all ease-out 0.5s;
  z-index: 10;

  a {
    display: flex;
    text-decoration: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  img {
    max-height: 220px;
    max-width: 170px;
  }

  &:hover img {
    transition: all ease-in 0.5s;
    transform: translateX(4px);
  }
`;

const Price = styled.div`
  background-color: #e7422f;
  padding: 0.7rem;
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

export default class Products extends Component {
  render() {
    return (
      <div>
        <WrapperList>
          {this.props.products.map((product) => (
            <li key={product._id}>
              <ProductItem>
                <a href={`#${product._id}`}>
                  <img src={`${product.image}.jpg`} alt={product.title}></img>
                  <p> {product.title} </p>
                </a>
                <Price>
                  <div> {formatCurrency(product.price)} </div>
                  <Button primary>Add to cart</Button>
                </Price>
              </ProductItem>
            </li>
          ))}
        </WrapperList>
      </div>
    );
  }
}
