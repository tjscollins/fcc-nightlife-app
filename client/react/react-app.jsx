/*----------React----------*/
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

/*----------Redux----------*/
import {Provider} from 'react-redux';
import configureStore from 'configureStore';

/*----------Components----------*/
import Index from 'Index';
import Login from 'Login';
import RouteContainer from 'RouteContainer';
import Profile from 'Profile';

let bars = [];
let photos = {};
try {
  bars = [...JSON.parse(localStorage.getItem('bars'))];
  photos = {...JSON.parse(localStorage.getItem('photos'))};
} catch (e) {
  console.log(e);
}

const store = configureStore({bars, photos, headcounts: {}, user: {}});

/**
 * Component Class to Route within SPA
 */
class Routes extends React.Component {
/**
 * render - standard render method
 *
 * @return {JSX}
 */
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={RouteContainer}>
          <IndexRoute component={Index} />
          <Route path='login' component={Login} />
          <Route path='profile' component={Profile} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('react-app'));
