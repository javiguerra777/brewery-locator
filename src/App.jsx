import './App.css';
import Mainpage from './components/Mainpage';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Maps from './components/Maps';

function App() {
  return (
    <>
    <div className="App">
      <Maps></Maps>
      <Mainpage />
    </div>
    </>
  );
}

export default App;
