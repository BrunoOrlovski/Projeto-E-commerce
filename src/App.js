import './App.css';
import './styles/header.css'
import Header from './components/header'; 
import Footer from './components/Footer'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';


function App() {
  return (
    <Router> 
      <div className="App">
        <Header/>
        
        <Routes>
          <Route path="/" element={<Home />} end />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;