import React, { Component } from 'react';
import styled from 'styled-components';
import { SearchContext } from '../searchContext';

import FirstElement from './FirstElement';
import { CustomScroll } from '../StyledGlobal';
import { SearchProduct } from './SearchProduct';

const MainList = styled.ul`
  background-color: tomato;
  color: white;
  list-style-type: none;
  margin-bottom: 0px;
  margin-top: 0;
  z-index: 10;
  padding: 10px;
  padding-top: 0;
  max-height: 700px;
  max-width: 480px;
  overflow-y: scroll;
  transition: max-height ease-in-out 0.3s;

  &.noHeight {
    max-height: 0;
  }
  ${CustomScroll}
`;

const Warning = styled.div`
  background-color: salmon;

  h3 {
    background-color: #ff4934;
    border-radius: 6px;
    padding: 5px;
    padding-top: 20px;
    color: white;
    margin: 0;
    font-weight: normal;
  }
`;

const result = {
  zIndex: '400',
  backgroundColor: 'pink',
  margin: 0,
  padding: 10,
  color: 'blue',
};

const InWarning = styled.div`
  background-color: yellow;
  padding: 10px;
  font-weight: normal;

  span {
    font-weight: bold;
    color: #22ff7e;
  }
`;

// end of style
// ====================================================================================

export default class SubUI extends Component {
  static contextType = SearchContext;
  render() {
    const filterText = this.context;
    const products = this.props.products;

    const rows = [];
    const productInfo = [];

    products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
        rows.push(null);
        productInfo.push({
          productID: product._id,
          productTitle: product.name,
          productImg: product.image,
          productPrice: parseInt(product.price),
          productDesc: product.description,
          productCategory: product.category,
        });
      }
    });

    let onlyOne = false;
    let warning;
    let firstElement;

    if (rows.length === 1) {
      onlyOne = true;
      console.log(productInfo);
      return (
        <div>
          <FirstElement
            productInfo={productInfo}
            result={productInfo.length}
          ></FirstElement>
          <h3 style={result}>
            Search result: {productInfo.length} <span>product</span>
          </h3>
        </div>
      );
    } else if (rows.length === 0) {
      warning = (
        <InWarning>
          <h3>Product you&apos;re looking for doesnt exist</h3>
        </InWarning>
      );
    } else {
      onlyOne = false;
      warning = (
        <InWarning>
          <h3>
            Search result: {rows.length} <span>products</span>
          </h3>
        </InWarning>
      );
      firstElement = rows.shift();
    }

    console.log('rows-length after shift:', rows.length);
    return (
      <div>
        <MainList className={rows.length === 0 ? 'noHeight' : null}>
          {onlyOne ? (
            ''
          ) : (
            <FirstElement
              fisrstElement={firstElement}
              filterText={filterText}
              productInfo={productInfo}
            ></FirstElement>
          )}
          {productInfo.splice(1, productInfo.length).map((item) => (
            <SearchProduct
              key={item.productID}
              product={item}
              filterText={filterText}
            ></SearchProduct>
          ))}
        </MainList>
        <Warning>{warning}</Warning>
      </div>
    );
  }
}
