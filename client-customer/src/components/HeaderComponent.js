import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isHome = location.pathname === '/home';

  if (isHome) {
    return (
      <header className="bg-dark py-5">
        <div className="container px-3 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Book in our life</h1>
            <p className="lead fw-normal text-white-50 mb-0">The enthusiasm for books never stops</p>
          </div>
        </div>
      </header>
    );
  }
  return null;
};

export default Header;