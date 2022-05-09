import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyle from '../utils/globalStyle';
import Header from '../components/Header'
import styled from 'styled-components';

const Wrapper = styled.div`

`

const Layout = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  )
};

export default Layout;