import React from "react";
import styled from "styled-components";
import { ChevronUp, ChevronDown } from "../constants/icon";
import { useCartStore } from "../store/Cartstore";

const CartContainer = () => {
  const { cartItems, total, increase, decrease, clearCart } = useCartStore();

  // cartItems가 undefined인 경우 빈 배열로 처리
  const items = cartItems || [];

  return (
    <Container>
      {items.length > 0 ? (
        items.map((item) => (
          <CartItem key={item.id}>
            <AlbumCover src={item.img} alt={item.title} />
            <Details>
              <Title>{item.title}</Title>
              <Singer>{item.singer}</Singer>
              <Price>₩{item.price}</Price>
            </Details>
            <AmountWrapper>
              <ChevronUp onClick={() => increase(item.id)} />
              <Amount>{item.amount}</Amount>
              <ChevronDown onClick={() => decrease(item.id)} />
            </AmountWrapper>
          </CartItem>
        ))
      ) : (
        <EmptyMessage>장바구니가 비어 있습니다.</EmptyMessage>
      )}

      <Footer>
        <TotalPriceWrapper>
          <TotalLabel>총 가격</TotalLabel>
          <TotalAmount>₩{total}</TotalAmount>
        </TotalPriceWrapper>
        <ClearButton onClick={clearCart}>장바구니 초기화</ClearButton>
      </Footer>
    </Container>
  );
};

export default CartContainer;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
`;

const AlbumCover = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;
  color: #333;
`;

const Singer = styled.p`
  font-size: 0.875rem;
  margin: 0.25rem 0;
  color: #666;
`;

const Price = styled.p`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0;
  color: #000;
`;

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 24px;
    height: 24px;
    color: #333;
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;

const Amount = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  margin-top: 2rem;
  border-top: 2px solid #ddd;
  padding-top: 1rem;
`;

const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TotalLabel = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const TotalAmount = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
`;

const ClearButton = styled.button`
  background-color: transparent;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-end;
  margin: 0 auto;

  &:hover {
    background-color: #ff4d4f;
    color: white;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #999;
`;
