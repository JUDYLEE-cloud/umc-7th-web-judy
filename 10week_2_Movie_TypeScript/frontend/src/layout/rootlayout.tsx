import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import './rootlayout.css';

// React Function Component로 타입 지정
const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
