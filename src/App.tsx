import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from './screens/Login';
import { Home } from './screens/Home';
import { Employees } from './screens/Employees';
import { AddEmployee } from './screens/AddEmployee';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/add" element={<AddEmployee />} />
    </Routes>
  );
}

export default App;
