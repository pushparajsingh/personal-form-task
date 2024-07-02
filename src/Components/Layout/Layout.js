import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-content">{children}</div>
    </>
  );
};

export default Layout;
