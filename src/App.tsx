import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from './screens/Login';
import { Home } from './screens/Home';
import { Employees } from './screens/Employees';
import { AddEmployee } from './screens/AddEmployee';
import { EditEmployee } from './screens/EditEmployee';
import { ShowEmployee } from './screens/ShowEmployee';
import { RepositoriesScreen } from './screens/Repositories';
import { AddRepositoryScreen } from './screens/AddRepository';
import { EditRepositoryScreen } from './screens/EditRepository';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/add" element={<AddEmployee />} />
      <Route path="/employees/:id/show" element={<ShowEmployee />} />
      <Route path="/employees/:id/edit" element={<EditEmployee />} />
      <Route path="/repositories" element={<RepositoriesScreen />} />
      <Route path="/repositories/add" element={<AddRepositoryScreen />} />
      <Route path="/repositories/:id/edit" element={<EditRepositoryScreen />} />
    </Routes>
  );
}

export default App;
