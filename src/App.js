import React from 'react';
import styled, { css } from 'styled-components';
import './global.css';

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
  &:hover {
    color: #ff9047;
  }
`;

const App = () => {
  return (
    <GridContainer>
      <Header>
        <strong>
          <Logo>React Shopping Cart</Logo>
        </strong>
      </Header>
      <Main>Product List</Main>
      <Footer>all right is reserved</Footer>
    </GridContainer>
  );
};

export default App;
