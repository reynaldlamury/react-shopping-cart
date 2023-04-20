/// =======================================
/// This file (app.js) is ENTRY POINT (client-side)
/// =======================================
import React from 'react';
import styled from 'styled-components';
import './global.css';
// ------------============------ COMPONENTS -----------------------  //
import FilterableProductTable from './components/FilterableProductTable';
import MainShop from './components/MainShop';
import Nav from './components/Nav';
import Login from './pages/Login';
// ------------============------ COMPONENTS -----------------------  //
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinStars } from '@fortawesome/free-regular-svg-icons';
// ------------------------------------------------ redux
import { Provider } from 'react-redux';
import store from './ReduxStore';
import { loadUser } from './actions/authActions';
import ProductDetail from './components/ProductDetail';
import ProductPage from './components/ProductPage';
import ResetPassUI from './components/ResetPassUI';
import RegisterUI from './components/RegisterUI';
import NewPassPage from './components/NewPassPage';
import Routes from './Routes';
// import { connect } from 'react-redux';
// ------------------------------------------------ redux
// ================================================ All dependencies life up here

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

// feature 1
const App = () => {
  // bring information in form reducer
  const [{ currentPath }] = useStateValue();
  const [Authenticated, setAuthenticated] = React.useState();
  const { auth } = store.getState();

  React.useEffect(() => {
    store.dispatch(loadUser());

    setAuthenticated(auth.isAuthenticated);
  });

  // console.log('Auth', Authenticated);

  return (
    <Provider store={store}>
      <Router>
        <GridContainer>
          {/* Header Section - start*/}
          <Header className={currentPath === '/login' ? 'onLogin' : null}>
            <strong>
              {/* <Logo>React Shopping Cart</Logo> */}
              <FontAwesomeIcon icon={faGrinStars} size="2x"></FontAwesomeIcon>
            </strong>
            <Nav />
            <FilterableProductTable />
          </Header>
          {/* <Route path="/login" exact component={Login} /> */}
          {/* Header Section - send */}
          {/* <Route path="/" exact component={MainShop} />
          <Route path="/Products" exact component={ProductPage} />
          <Route path="/:id" exact component={ProductDetail} />
          <Route path="/forgot-password" exact component={ResetPassUI} />
          <Route path="/Signup" exact component={RegisterUI} />
          <Route
            path="/reset-password/:id/:token"
            exact
            component={NewPassPage}
          /> */}
          <Routes sdff={Authenticated} />
          <Footer>all right is reserved</Footer>
          {/* Footer */}
        </GridContainer>
      </Router>
    </Provider>
  );
};

export default App;
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps)(App);
