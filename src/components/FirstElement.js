import React, { Component } from 'react';
import styled from 'styled-components';
import formatCurrency from '../utils';

const Item = styled.div`
  background-color: #ffffa3;
  display: flex;
  align-items: center;
  margin: 5px;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  padding: 10px;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  max-width: 480px;

  &:hover {
    background-color: #ffff4b;
  }

  img {
    width: 55px;
    height: 75px;
    margin-bottom: 10px;
  }
`;

const Photo = styled.div`
  background-color: blue;
`;

const Information = styled.div`
  flex: 2 50px;
  background-color: #ffd6b8;
  color: #c96100;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  font-size: 15px;

  p,
  h2 {
    margin: 4px;
    padding: 0;
  }
  h3 {
    margin: 0;
    padding: 0;
    flex: 1 10px;
  }
  div {
    justify-content: space-between;
    font-weight: bold;

    span {
      color: magenta;
    }
    hr {
      margin: 3px;
      padding: 0;
      height: 1.5px;
      background-color: magenta;
      border: none;
    }
  }
`;

const Price = styled.div`
  background-color: #443636;
  /* justify-content: center; */
  /* align-items: center; */
  text-align: center;
  font-weight: bold;
  padding: 5px;
  flex: auto;
  height: 70px;

  p {
    display: flex;
    flex-direction: row;
  }
`;

export default class FirstElement extends Component {
  render() {
    const filterText = this.props.filterText;
    console.log('filter', filterText);

    const product = this.props.productInfo[0];
    // console.log('product', product);
    let finalEl;
    if (product === undefined) {
      return null;
    } else {
      finalEl = (
        <Item>
          <Photo>
            <img src={`${product.productImg}`} alt={product.productTitle}></img>
          </Photo>
          <Information>
            <h2> {product.productTitle} </h2>
            <p> {product.productDesc} </p>
            <div>
              {' '}
              <hr></hr>
              <span>category:</span> {product.productCategory}
            </div>
          </Information>
          <Price>
            <h3>{formatCurrency(product.productPrice)}</h3>
          </Price>
        </Item>
      );
    }
    // console.log('info', product);
    return <div> {finalEl} </div>;
  }
}
