import React from 'react';
import styled from 'styled-components';
import { Product } from './Product';
//============================================= Redux
import { connect } from 'react-redux';
import { deleteItem } from '../actions/itemActions';
import { addToCart } from '../actions/userActions';
import { loadUser } from '../actions/authActions';
//============================================= Redux

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
  const { deleteItem, addToCart, auth, loadUser } = props;

  return (
    <div>
      <WrapperList>
        {props.products.map((product) => (
          <Product
            key={product._id}
            product={product}
            deleteItem={deleteItem}
            addToCart={addToCart}
            currentUser={auth}
            loadUser={loadUser}
          ></Product>
        ))}
      </WrapperList>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  item: state.item,
});

export default connect(mapStateToProps, {
  deleteItem,
  addToCart,
  loadUser,
})(Products);
