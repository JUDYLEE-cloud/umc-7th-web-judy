import React from 'react';
import styled from 'styled-components';
import { CartIcon } from '../constants/icon';
import { useSelector } from 'react-redux';

const NavigationBar = () => {
  const { amount } = useSelector((state) => state.cart);

  return (
    <Navbar>
        <Title>JUDY PlayList</Title>

        <IconWrapper>
          <CartIcon />
          <Badge>{amount}</Badge>
        </IconWrapper>
    </Navbar>
  );
};

export default NavigationBar;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgb(0, 70, 42);
  position: relative; /* Navbar 내에서 위치 제어 가능 */
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const IconWrapper = styled.div`
  position: relative; /* Badge를 IconWrapper 기준으로 배치 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;
    stroke: white;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: -5px; /* IconWrapper 위로 살짝 올림 */
  right: -5px; /* IconWrapper 오른쪽으로 위치 */
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.7); /* 회색 불투명 */
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* Badge는 클릭되지 않도록 설정 */
`;