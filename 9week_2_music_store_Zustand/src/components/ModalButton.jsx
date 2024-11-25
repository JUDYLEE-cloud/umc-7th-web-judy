import styled from "styled-components";
import { useCartStore } from "../store/Cartstore";

const ModalButton = () => {
    const { clearCart } = useCartStore();

    return (
        <ButtonContainer>
            <ConfirmButton
              onClick={() => {
                clearCart();
                onclose();
              }}>
                네
            </ConfirmButton>

            <CancelButton onClick={onclose}>
                아니요
            </CancelButton>
        </ButtonContainer>
    );
};

export default ModalButton;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 버튼 간격 조정 */
  gap: 1rem;
  margin-top: 1.5rem; /* 버튼 위 공간 */
`;

const ConfirmButton = styled.button`
  background-color: #28a745; /* 녹색 */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100px;

  &:hover {
    background-color: #218838; /* 더 진한 녹색 */
  }
`;

const CancelButton = styled.button`
  background-color: #dc3545; /* 빨간색 */
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100px;

  &:hover {
    background-color: #c82333; /* 더 진한 빨간색 */
  }
`;