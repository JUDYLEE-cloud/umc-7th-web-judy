import './App.css'
import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { calculateTotals } from './feature/cartSlice'
import ModalPortal from './components/ModalPortal'
import Modal from './components/Modal'

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
   dispatch(calculateTotals())
  }, [cartItems, dispatch])

  return (
    <>
     <header>
        <Navbar />
     </header>

     <main>
        <CartContainer />
        {isOpen && 
           <ModalPortal>
               <Modal>
                  <h4>담아두신 모든 음반을 삭제하시겠습니까?</h4>
               </Modal>
            </ModalPortal>
         }
     </main>

     <footer>
        <Footer />
     </footer>
    </>
  );
}

export default App
