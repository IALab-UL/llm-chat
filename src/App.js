import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, useParams, } from "react-router-dom";
import ChatPage from './components/ChatPage/ChatPage';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
