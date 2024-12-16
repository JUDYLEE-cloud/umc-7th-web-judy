import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar: React.FC = () => {
  const [userData, setUserData] = useState<{email: string} | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch ('http://localhost:3000/user/me', {
        method: 'GET',
        headers: {
          Authorizaiton: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({email: data.email});
      } else {
        console.error('user data fetch 실패');
      } 
    } catch (error) {
      console.error('user data fetch 오류:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({username: 'username', password: 'password'}),
        headers: {'Content-Type': 'application/json'},
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.accessToken;
        localStorage.setItem('accessToken', token);
        fetchUserData(token);
      } else {
        alert ('로그인 실패');
      }
    } catch (error) {
      alert ('로그인 중 오류 발생');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUserData(null);
  };

  return (
    <nav>
      <div className="navbar-top">
        <div className="logo">
          <Link to="/">JUDYFLIX</Link>
        </div>

        <div className="navbar-right">
          {userData ? (
            <>
              <span className="nickname-message">{`${userData.email.split('@')[0]}님 반갑습니다`}</span>
              <button onClick={handleLogout} className="btn-logout">
                로그아웃
              </button>
            </>
          ) : (
            <> 
              <Link to="/login" onClick={handleLogin} className="btn-login">
                로그인
              </Link>
              <Link to="/signup" className="btn-signup">
                회원가입
              </Link>
            </>)}
        </div>
      </div>

      <div className="nav-menu">
        <ul>
          <li>
            <Link to="/search">
              <span className="material-symbols-outlined search-icon">search</span>
              Search
            </Link>
          </li>
          <li>
            <Link to="/category">
              <span className="material-symbols-outlined movie-icon">movie</span>
              Movie
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
