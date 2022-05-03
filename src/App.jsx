import './App.css';
import Mainpage from './pages/Main';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Maps from './components/Maps';

function App() {
  return (
    <>
    <div className="App">
      <Mainpage />
    </div>
    </>
  );
}

export default App;
