import './App.css';
import './styles/header.css';
import Header from './components/header'; 
import Footer from './components/Footer'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Product from './pages/Product';
import ShoppCart from './pages/ShoppCart'; // ✅ Certifique-se que o caminho está correto

function App() {
  return (
    <Router> 
      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/ShoppCart" element={<ShoppCart />} /> 
        </Routes>

        <Footer/>
      </div>
    </Router>
  );
}

export default App;
