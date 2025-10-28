import './App.css';
import './styles/header.css';
import Header from './components/header'; 
import Footer from './components/Footer'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Product from './pages/Product';
import ShoppCart from './pages/ShoppCart';
import LoginPage from './pages/LoginPage'; 
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router> 
      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/ShoppCart" element={<ShoppCart />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} />   
        </Routes>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
