import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/header/header';
import MainPage from './components/mainPage/mainPage';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header /><MainPage /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
