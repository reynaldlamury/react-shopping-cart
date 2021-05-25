import React from 'react';
import styled, { css } from 'styled-components';
import './global.css';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import SearchSection from './components/SearchSection';

const GridContainer = styled.section`
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-rows: 5rem 1fr 5rem;
  grid-template-columns: 1fr;
  height: 100%;
`;

const Header = styled.header`
  grid-area: 'header';
  background-color: #5e42fc;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const Main = styled.main`
  grid-area: 'main';
  background-color: coral;
`;

const Footer = styled.footer`
  grid-area: 'footer';
  background-color: slateblue;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.a`
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  flex: 2 19rem;
  &:hover {
    color: #ff9047;
  }
`;

const Content = styled.div`
  background-color: #b0ff49;
  display: flex;
`;

const ContentMain = styled.div`
  background-color: #5ef8f0;
  flex: 3 50rem;
`;

const ContentSidebar = styled.div`
  background-color: #ff8ef6;
  flex: 2 20rem;
`;

// feature 1
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: '',
      SearchisActive: false,
    };
  }

  filterProducts = (event) => {
    const sort = this.state.sort;
    if (event.target.value === '') {
      this.setState({
        size: event.target.value,
        products: data.products.sort((a, b) =>
          sort === 'lowest'
            ? a.price > b.price
              ? 1
              : -1
            : sort === 'highest'
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1,
        ),
      });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products
          .filter(
            (product) =>
              product.availableSizes.indexOf(event.target.value) >= 0,
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
              : a._id > b._id
              ? 1
              : -1,
          ),
      });
    }
  };

  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
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
            : a._id > b._id
            ? 1
            : -1,
        ),
    }));
  };

  // handleTyping = (event) => {
  //   console.log(event.target.value);
  // };

  render() {
    return (
      <GridContainer>
        <Header>
          <strong>
            <Logo>React Shopping Cart</Logo>
          </strong>
          <SearchSection></SearchSection>
        </Header>
        <Main>
          <Content>
            <ContentMain>
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products}></Products>
            </ContentMain>
            <ContentSidebar>sidebar content</ContentSidebar>
          </Content>
        </Main>
        <Footer>all right is reserved</Footer>
      </GridContainer>
    );
  }
}

export default App;
