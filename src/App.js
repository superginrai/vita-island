import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

import './styles/main.css';
import CollectionView from './components/CollectionView/CollectionView';
import FavoritesView from './components/FavoritesView/FavoritesView';
import GenreView from './components/GenreView/GenreView';
import NewGameView from './components/NewGameView/NewGameView';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';

const App = () => (
  <div>
    {/* <ButtonAppBar/> */}
    {/* <Header title="VITA;island" /> */}
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
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>4O4</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
