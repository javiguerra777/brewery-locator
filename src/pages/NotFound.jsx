import React from 'react';
import styled from 'styled-components';
import bkgd_img from '../img/four_oh_four_bkgd.png'
import { useNavigate } from 'react-router-dom';

const FourOhFour = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bkgd_img});
  background-repeat: 'no-repeat';
  background-position: 'center center';
  background-attachment: 'fixed';
  background-size: 'cover';
  h2{
    font-size: 5rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <FourOhFour>
      <h2>404: Page Not Found!</h2>
      <button onClick={()=> navigate('/')}>Go to Home</button>
    </FourOhFour>
  );
};

export default NotFound;