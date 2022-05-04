import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyle from '../utils/globalStyle';
const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
};

export default Layout;