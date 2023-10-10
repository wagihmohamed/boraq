import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from './screens/Login';
import { Home } from './screens/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
