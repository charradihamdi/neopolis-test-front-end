import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to='/' exact activeClassName="active-left-nav">
            <img src="./img/icons/home.svg" alt="home"/>
          </NavLink>
          
          <br/>
        
        </div>
      </div>
    </div>
  );
};

export default LeftNav;