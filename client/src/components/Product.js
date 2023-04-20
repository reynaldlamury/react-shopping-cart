import React from 'react';
import formatCurrency from '../utils';
import styled from 'styled-components';
// import { useStateValue } from '../StateProvider';
import { motion } from 'framer-motion';
//--------------------------------- REDUX
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//--------------------------------- REDUX
import { Link } from 'react-router-dom';
//------------------------------------------ All dependencies life up here

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

const DelBtn = styled.div`
  position: absolute;
  bottom: 48px;
  transform: translateX(-10px);
  width: 10.3rem;
  cursor: pointer;
  background-color: #232731;
  color: #ffff3c;
  align-items: center;
  text-align: center;
  padding: 6px;
  border: 1px solid #ffff3c;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: #141518;
  }
`;

export const Product = (props) => {
  // const [{ basket }, dispatch] = useStateValue();
  // console.log('this is item in the basket:', basket);
  // console.log('delteitem:', props.deleteItem);
  const { product, deleteItem, addToCart, currentUser, loadUser } = props;
  const { _id: id, name, price } = product; // object destructuring
  //----------------------------------- prop types ---//
  Product.propTypes = {
    addToCart: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    loadUser: PropTypes.func,
  };
  //----------------------------------- prop types ---//
  const addToBasket = async () => {
    // dipatch item to the data layer
    // dispatch({
    //   type: 'ADD_TO_BASKET',
    //   item: {
    //     id: id,
    //     name: name,
    //     image: props.product.image,
    //     price: price,
    //     desc: props.product.description,
    //   },
    // });
    //----------------------- stored in mongoDB (userSchema)
    await addToCart({ currentUser: currentUser._id, product });
    loadUser();
    // const res = await axios.put(`/api/users/${currentUser.id}/cart`, product);

    //----------------------- stored in mongoDB
  };

  const delItem = () => {
    // delete item --> redux store (global)
    deleteItem(id);
  };

  return (
    <li>
      <ProductItem as={motion.div} initial={{ y: 30 }} animate={{ y: 0 }}>
        <Link to={`/${id}`}>
          <img src={`${props.product.image}`} alt={name}></img>
          <p> {name} </p>
        </Link>
        <DelBtn onClick={delItem}>Delete Item</DelBtn>
        <Price>
          <div> {formatCurrency(price)} </div>
          <Button primary onClick={addToBasket}>
            Add to cart
          </Button>
        </Price>
      </ProductItem>
    </li>
  );
};

export default Product;

// export default connect({ loadUser })(Product);
