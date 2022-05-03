import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';


const Layout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;