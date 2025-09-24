
import './App.css';
import './styles/header.css'
import Header from './components/header'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <Router> 
      <div className="App">
        <Header/>
       
        <Routes>
          <Route path="/" element={<h2>Página Inicial</h2>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;