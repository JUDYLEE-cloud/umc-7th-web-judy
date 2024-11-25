import React from "react";
import ModalButton from "./ModalButton";
import styled from "styled-components";

const Modal = ({ children, onClose }) => {
    const handleClickOutside = (e) => {
        if (e.target.classList.contains("modal-container")) {
            onClose();
        }
    };

    return (
        <ModalContainer onClick={handleClickOutside}>
            <ModalContent>
                {children}
                <ModalButton/>
            </ModalContent>
        </ModalContainer>
    );
};

export default Modal;

const ModalContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  z-index: 1000; /* 다른 요소 위에 표시 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
  width: 90%; /* 화면 크기 기준 너비 */
  max-width: 400px; /* 최대 너비 */
  text-align: center; /* 텍스트 중앙 정렬 */
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #ff7875;
  }
`;