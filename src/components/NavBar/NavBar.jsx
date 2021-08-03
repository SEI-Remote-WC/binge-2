import React from 'react';
import { Link } from "react-router-dom";
import Search from '../Search/Search'
const NavBar = ({ user, handleLogout, history }) => {
    return (
    <>
      {user ?
        <nav>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
              <li className="nav-link">Welcome, {user.name}</li>
              <li><Link to="/users" className="nav-link">Users</Link></li>
              <Link to='' onClick={handleLogout}>LOG OUT</Link>
              <Search 
                history={history}
              />
            </ul>
          </div>
        </nav>
      :
        <nav>
          <div className="nav-wrapper">
            <ul id="nav-mobile" className="right">
              <li><Link to="/login" className="nav-link">Log In</Link></li>
              <li><Link to="/users" className="nav-link">Users</Link></li>
              <li><Link to="/signup" className="nav-link">Sign Up</Link></li>
            </ul>
          </div>
        </nav>
      }
    </>
  )
}

export default NavBar;
