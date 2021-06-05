import React from 'react';
import styled from 'styled-components';
import './global.css';
import FilterableProductTable from './components/FilterableProductTable';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainShop from './components/MainShop';
import Nav from './components/Nav';
import CartNav from './components/CartNav';
import { Login } from './pages/Login';
import { useStateValue } from './StateProvider';

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
  position: relative;
  grid-area: 'header';
  background-color: #5e42fc;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  transition: all ease-in-out 0.3s;

  &.onLogin {
    background-color: #36313b;
    color: #dd4564;
  }
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

// feature 1
const App = () => {
  // bring information in form reducer
  const [{ LoginPageActive }] = useStateValue();

  return (
    <Router>
      <GridContainer>
        {/* Header Section - start*/}
        <Header className={LoginPageActive ? 'onLogin' : null}>
          <strong>
            <Logo>React Shopping Cart</Logo>
          </strong>
          <Nav />
          <CartNav />
          <FilterableProductTable />
        </Header>
        {/* Header Section - send */}

        <Route path="/" exact component={MainShop} />
        <Route path="/Login" exact component={Login} />

        {/* Footer */}
        <Footer>all right is reserved</Footer>
        {/* Footer */}
      </GridContainer>
    </Router>
  );
};

export default App;
