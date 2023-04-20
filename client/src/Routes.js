import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './pages/Login';
import MainShop from './components/MainShop';
import ProductDetail from './components/ProductDetail';
import ResetPassUI from './components/ResetPassUI';
import RegisterUI from './components/RegisterUI';
import NewPassPage from './components/NewPassPage';
// --------------------------------- REDUX
import { connect } from 'react-redux';
// --------------------------------- REDU

const Routes = ({ auth }) => {
  console.log(`auth`, auth);

  return (
    <Switch>
      <ProtectedRoute auth={auth} exact path="/" component={MainShop} />
      <Route auth={auth} exact path="/login" component={Login} />
      <ProtectedRoute
        auth={auth}
        exact
        path="/reset-password/:id/:token"
        component={NewPassPage}
      />

      <ProtectedRoute auth={auth} exact path="/:id" component={ProductDetail} />
      <RouteLogin
        auth={auth}
        exact
        path="/forgot-password"
        component={ResetPassUI}
      />
      <RouteLogin auth={auth} exact path="/Signup" component={RegisterUI} />
    </Switch>
  );
};

const RouteLogin = ({ component: Component, ...rest }) => {
  const { auth } = rest;
  console.log('enter routelogin');
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = rest;
  console.log('enter protected route');
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

// export default Routes;
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
