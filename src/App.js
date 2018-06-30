import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

import './styles/main.css';
import CollectionView from './components/CollectionView/CollectionView';
import FavoritesView from './components/FavoritesView/FavoritesView';
import GenreView from './components/GenreView/GenreView';
import NewGameView from './components/NewGameView/NewGameView';
import SearchView from './components/SearchView/SeachView';

const App = () => (
  // <React.Fragment>
  //      <CssBaseline />
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
          <Route
          path="/collection"
          component={CollectionView}
        />
          <Route
          path="/favorites"
          component={FavoritesView}
        />
          <Route
          path="/genre"
          component={GenreView}
        />
         <Route
          path="/newGame"
          component={NewGameView}
        />
          <Route
          path="/search"
          component={SearchView}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>4O4</h1>} />

      </Switch>
    </Router>
  </div>
  // </React.Fragment>
);

export default App;
