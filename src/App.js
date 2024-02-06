import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, useParams, } from "react-router-dom";
import ChatPage from './components/ChatPage/ChatPage';
import './App.css';
import MainPage from './components/MainPage/MainPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
