import React, { useState, useEffect } from 'react';
import Products from './Products';
import Filter from './Filter';
import styled from 'styled-components';
// import data from '../data.json';
import axios from 'axios';
import Pagination from './Pagination';
import SideCart from './SideCart';

const Main = styled.main`
  grid-area: 'main';
  background-color: coral;
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

const MainShop = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // pagination
  const [CurrentPage, setCurrentPage] = useState(1);
  const [ItemperPage, setItemperPage] = useState(5);
  // lofic of pagination
  const lastIndexOfItem = CurrentPage * ItemperPage;
  const firstIndexOfItem = lastIndexOfItem - ItemperPage;

  const totalPaginationNum = [];
  for (let i = 1; i <= Math.ceil(filteredProducts.length / ItemperPage); i++) {
    totalPaginationNum.push(i);
  }
  console.log('length of filteredProducts:', filteredProducts.length);
  console.log('totalPaginationNUm', totalPaginationNum);

  const keepFetching = products.length === 0 ? () => products : null;
  // useeffect -- lifecycle react
  useEffect(() => {
    const fetchItems = async () => {
      axios
        .get('https://fakestoreapi.com/products')
        .then((res) => {
          setProducts(res.data);
          console.log('originalProduct length', products.length);
          setFilteredProducts(products);
          console.log(
            'useEffect rendering filteredProducts...',
            filteredProducts,
          );
        })
        .catch((err) => {
          console.log(err);
        });
      // const data = await fetch('https://fakestoreapi.com/products');
      // const items = await data.json();
      // setProducts(items);
      // setFilteredProducts(products);
      // console.log('products:', products);
    };

    fetchItems();
  }, [keepFetching]);

  console.log('total products(filteredProducts)', filteredProducts);
  // slice data for pagination
  let currentProducts = filteredProducts.slice(
    firstIndexOfItem,
    lastIndexOfItem,
  );
  console.log(`On page ${CurrentPage} Products:`, currentProducts);

  const filterProducts = (event) => {
    if (event.target.value === '') {
      setCurrentPage(1);
      setCategory(event.target.value);
      setFilteredProducts(
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
      setFilteredProducts(
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

  const sortProducts = (event) => {
    const sort = event.target.value;
    setSort(sort);
    setFilteredProducts(
      filteredProducts
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
        ),
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
      <Main>
        <Content>
          <ContentMain>
            <Filter
              count={filteredProducts.length}
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

            {products.length === 0 ? (
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

export default MainShop;
