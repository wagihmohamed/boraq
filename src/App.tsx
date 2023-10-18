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
import { ShowRepository } from './screens/ShowRepository';
import { ClientsScreen } from './screens/Clients';
import { AddClient } from './screens/AddClient';
import { EditClient } from './screens/EditClient';
import { BranchesScreen } from './screens/Branches';
import { AddBranch } from './screens/AddBranch';
import { EditBranch } from './screens/EditBranch';
import { ShowBranch } from './screens/ShowBranch';
import { LocationsScreen } from './screens/Locations';

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
      <Route path="/repositories/:id/show" element={<ShowRepository />} />
      <Route path="/clients" element={<ClientsScreen />} />
      <Route path="/clients/add" element={<AddClient />} />
      <Route path="/clients/:id/edit" element={<EditClient />} />
      <Route path="/branches" element={<BranchesScreen />} />
      <Route path="/branches/add" element={<AddBranch />} />
      <Route path="/branches/:id/edit" element={<EditBranch />} />
      <Route path="/branches/:id/show" element={<ShowBranch />} />
      <Route path="/locations" element={<LocationsScreen />} />
    </Routes>
  );
}

export default App;
