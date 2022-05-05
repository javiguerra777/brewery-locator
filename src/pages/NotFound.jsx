import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h2>404: Page Not Found!</h2>
      <button onClick={()=> navigate('/')}>Go to Home</button>
    </main>
  );
};

export default NotFound;