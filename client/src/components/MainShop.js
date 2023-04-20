import React, { useState, useEffect } from 'react';
import Products from './Products';
import Filter from './Filter';
import styled from 'styled-components';
// import axios from 'axios';
import Pagination from './Pagination';
import SideCart from './SideCart';
// --------------------------------- CONTEXT API
import { useStateValue } from '../StateProvider';
// --------------------------------- CONTEXT API
// --------------------------------- REDUX
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { loadUser } from '../actions/authActions';
// --------------------------------- REDUX
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';
// ==========================------------ All dependencies life up here

const Main = styled.main`
  grid-area: 'main';
  background-color: coral;
  filter: grayscale(0);
  transition: all ease-in-out 0.3s;

  &.postUI_Active {
    filter: grayscale(1);
  }
`;

const Content = styled.div`
  background-color: #b0ff49;
  display: flex;
`;

const ContentMain = styled.div`
  position: relative;
  background-color: #5ef8f0;
  flex: 3 50rem;
`;

const ContentSidebar = styled.div`
  background-color: #ff8ef6;
  flex: 2 20rem;
`;

const loadingStyle = {
  zIndex: '999',
  backgroundColor: 'red',
  color: 'white',
};

// ======================================================style end

const MainShop = (props) => {
  const { loadUser, user } = props;

  const location = useLocation();
  React.useEffect(() => {
    dispatch({
      type: 'GET_CURRENT_PATH',
      payload: location.pathname,
    });
  }, []);
  // ----------------------- - (context API) ------------------------ //
  const [{ isGrayScale }, dispatch] = useStateValue();
  // ----------------------- - (context API) ------------------------ //

  //=================================================================

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [filteredProducts, setfilteredProducts] = useState([]);
  // const [NewfilteredProducts, setNewfilteredProducts] = useState([]);

  // pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const [ItemperPage, setItemperPage] = useState(5);
  // lofic of pagination
  const lastIndexOfItem = CurrentPage * ItemperPage;
  const firstIndexOfItem = lastIndexOfItem - ItemperPage;
  const { isAuthenticated } = props.auth;
  const totalPaginationNum = [];

  const loadCart = () => {
    if (user.Cart.length > 0) {
      console.log('enter loadCart');
      loadUser();
    }
  };

  useEffect(() => {
    console.log('rendering MainShop.js ...');
    props.getItems();
    setfilteredProducts(props.item.items);
    loadCart();
  }, [props.item.items]);
  // if (!isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

  // slice data for pagination
  let currentProducts;
  let newfilterProd;
  if (filteredProducts.length > 0) {
    for (
      let i = 1;
      i <= Math.ceil(filteredProducts[0].length / ItemperPage);
      i++
    ) {
      totalPaginationNum.push(i);
    }
    newfilterProd = filteredProducts[0];
    currentProducts = filteredProducts[0].slice(
      firstIndexOfItem,
      lastIndexOfItem,
    );
  } else {
    for (
      let i = 1;
      i <= Math.ceil(filteredProducts.length / ItemperPage);
      i++
    ) {
      totalPaginationNum.push(i);
    }
    currentProducts = filteredProducts.slice(firstIndexOfItem, lastIndexOfItem);
  }
  // console.log(`On page ${CurrentPage} Products:`, currentProducts);
  // console.log('newfilterProd:', newfilterProd);

  const filterProducts = (event) => {
    if (event.target.value === '') {
      setCurrentPage(1);
      setCategory(event.target.value);
      setfilteredProducts(
        products.sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a.id > b.id
            ? 1
            : -1,
        ),
      );
    } else {
      setCurrentPage(1);
      setCategory(event.target.value);
      setfilteredProducts(
        products
          .filter(
            (product) => product.category.indexOf(event.target.value) >= 0,
          )
          .sort((a, b) =>
            sort === 'lowest'
              ? a.price > b.price
                ? 1
                : -1
              : sort === 'highest'
              ? a.price < b.price
                ? 1
                : -1
              : a.id > b.id
              ? 1
              : -1,
          ),
      );
    }
  };
  // =============== SORTING ITEMS (lowest || highest) ==================== //
  const sortProducts = (event) => {
    const sort = event.target.value;
    setSort(sort);
    newfilterProd
      .slice()
      .sort((a, b) =>
        sort === 'lowest'
          ? a.price > b.price
            ? 1
            : -1
          : sort === 'highest'
          ? a.price < b.price
            ? 1
            : -1
          : a.id > b.id
          ? 1
          : -1,
      );
  };

  // method for pagination logic
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handlePrevBtn = () => {
    if (totalPaginationNum === 1) {
      return null;
    } else if (CurrentPage === 1) {
      return null;
    } else {
      setCurrentPage(CurrentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (totalPaginationNum === 1) {
      return null;
    } else if (CurrentPage === totalPaginationNum.length) {
      return null;
    } else {
      setCurrentPage(CurrentPage + 1);
    }
  };

  return (
    <div>
      <Main className={isGrayScale ? 'postUI_Active' : null}>
        <Content>
          <ContentMain>
            <Filter
              count={
                newfilterProd ? newfilterProd.length : filteredProducts.length
              }
              category={category}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            ></Filter>
            <Pagination
              totalPaginationNum={totalPaginationNum}
              handleClick={handleClick}
              currentpage={CurrentPage}
              handleprevbtn={handlePrevBtn}
              handlenextbtn={handleNextBtn}
            ></Pagination>

            {filteredProducts?.length === 0 ? (
              <h1 style={loadingStyle}>LOADING ...</h1>
            ) : null}
            <Products products={currentProducts}></Products>
            <Pagination
              totalPaginationNum={totalPaginationNum}
              handleClick={handleClick}
              currentpage={CurrentPage}
              handleprevbtn={handlePrevBtn}
              handlenextbtn={handleNextBtn}
            ></Pagination>
          </ContentMain>
          <ContentSidebar>
            <SideCart></SideCart>
          </ContentSidebar>
        </Content>
      </Main>
    </div>
  );
};

MainShop.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  item: state.item,
  user: state.user,
});

export default connect(mapStateToProps, { getItems, loadUser })(MainShop);
// export default MainShop;
