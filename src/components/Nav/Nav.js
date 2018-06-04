import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        {/* <li>
          <Link to="/info">
            Info Page
          </Link>
        </li> */}
        <li>
          <Link to="/collection">
            Your Collecshion
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            Your FAvvvvs
          </Link>
        </li>
        <li>
          <Link to="/genre">
           jean val genres
          </Link>
        </li>
        <li>
          <Link to="/newGame">
           newgame+
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
