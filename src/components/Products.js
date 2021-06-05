import React from 'react';
import styled from 'styled-components';
import { Product } from './Product';

const WrapperList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style-type: none;
  background-color: blueviolet;

  li {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Products = (props) => {
  return (
    <div>
      <WrapperList>
        {props.products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </WrapperList>
    </div>
  );
};

export default Products;
