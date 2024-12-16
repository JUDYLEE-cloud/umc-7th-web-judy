import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './category.css';

const Category: React.FC = () => {
  const [showButtons, setShowButtons] = useState<boolean>(true); // 버튼 표시 여부 상태
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/category') {
      setShowButtons(true);
    }
  }, [location]);

  // 버튼을 클릭하면 버튼을 숨기고 Outlet만 보이게 하는 함수
  const handleLinkClick = (): void => {
    setShowButtons(false);
  };

  return (
    <>
      {showButtons ? ( // showButtons가 true일 때만 버튼을 표시
        <div>
          <div className="category-box">
            <Link to="nowplaying" className="category-item" onClick={handleLinkClick}>
              <img
                className="category-image"
                src="https://i.pinimg.com/564x/fd/cb/a4/fdcba48b8ace93912eb72e97cca63b28.jpg"
                alt="now playing"
              />
              <span className="category-text">Now Playing</span>
            </Link>
          </div>
          <div className="category-box">
            <Link to="popular" className="category-item" onClick={handleLinkClick}>
              <img
                className="category-image"
                src="https://i.pinimg.com/736x/e3/28/b5/e328b52943dd36b8c4710a47fd2b398c.jpg"
                alt="popular"
              />
              <span className="category-text">Popular</span>
            </Link>
          </div>
          <div className="category-box">
            <Link to="toprated" className="category-item" onClick={handleLinkClick}>
              <img
                className="category-image"
                src="https://i.pinimg.com/564x/b0/cd/2c/b0cd2cf57be501278f3729d5fee9fdfa.jpg"
                alt="toprated"
              />
              <span className="category-text">Top Rated</span>
            </Link>
          </div>
          <div className="category-box">
            <Link to="upcoming" className="category-item" onClick={handleLinkClick}>
              <img
                className="category-image"
                src="https://i.pinimg.com/736x/fd/65/79/fd6579b620a928ff9a258b9fdb6cb8ed.jpg"
                alt="upcoming"
              />
              <span className="category-text">Upcoming</span>
            </Link>
          </div>
        </div>
      ) : (
        <Outlet /> // 버튼을 클릭하면 Outlet만 표시
      )}
    </>
  );
};

export default Category;
