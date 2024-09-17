import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import Footer from './components/footer/footer';
import ProductPage from './components/productPage/productPage';
import Product from './components/productPage/product';
import AccountPage from './components/accountPage/accountPage';
import Checkout from './components/checkout/checkout';
import CheckoutSuccess from './components/checkout/checkoutSuccess';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header /><MainPage /><Footer /></>} />
          <Route path='/products' element={<><Header /><ProductPage /><Footer /></>} />
          <Route path='/products/:id' element={<><Header /><Product /><Footer /></>} />
          <Route path='/account' element={<><Header /><AccountPage /><Footer /></>} />
          <Route path='/checkout'  element={<><Header /> <Checkout /> <Footer /> </>} />
          <Route path='/checkout-success'  element={<><Header /> <CheckoutSuccess /> <Footer /> </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
