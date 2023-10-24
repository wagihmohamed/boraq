import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LoginScreen } from './screens/Login';
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
import { ShowLocation } from './screens/ShowLocation';
import { AddLocation } from './screens/AddLocation';
import { EditLocation } from './screens/EditLocation';
import { ShowClient } from './screens/ShowClients';
import { TenantsScreen } from './screens/Tenants';
import { ShowTenant } from './screens/ShowTenant';
import { EditTenant } from './screens/EditTenant';
import { AddTenant } from './screens/AddTenant';
import { Sizes } from './screens/Sizes';
import { Colors } from './screens/Colors/inedx';
import { Categories } from './screens/Categories';
import { Products } from './screens/Products';
import { AddProduct } from './screens/AddProduct';
import { ProductScreen } from './screens/ProductDetails';
import { EditProductScreen } from './screens/EditProduct';
import { Stores } from './screens/Stores';
import { useValidateToken } from './hooks/useValidateToken';
import { Loader } from '@mantine/core';
import PrivateRoutes from './components/PrivateWrappers';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useValidateToken();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isSuccess) {
      navigate('/employees');
    }
  }, [isSuccess, navigate]);

  if (isLoading && token) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route Component={PrivateRoutes}>
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/:id/show" element={<ShowEmployee />} />
        <Route path="/employees/:id/edit" element={<EditEmployee />} />
        <Route path="/repositories" element={<RepositoriesScreen />} />
        <Route path="/repositories/add" element={<AddRepositoryScreen />} />
        <Route
          path="/repositories/:id/edit"
          element={<EditRepositoryScreen />}
        />
        <Route path="/repositories/:id/show" element={<ShowRepository />} />
        <Route path="/clients" element={<ClientsScreen />} />
        <Route path="/clients/add" element={<AddClient />} />
        <Route path="/clients/:id/show" element={<ShowClient />} />
        <Route path="/clients/:id/edit" element={<EditClient />} />
        <Route path="/branches" element={<BranchesScreen />} />
        <Route path="/branches/add" element={<AddBranch />} />
        <Route path="/branches/:id/edit" element={<EditBranch />} />
        <Route path="/branches/:id/show" element={<ShowBranch />} />
        <Route path="/locations" element={<LocationsScreen />} />
        <Route path="/locations/add" element={<AddLocation />} />
        <Route path="/locations/:id/edit" element={<EditLocation />} />
        <Route path="/locations/:id/show" element={<ShowLocation />} />
        <Route path="/tenants" element={<TenantsScreen />} />
        <Route path="/tenants/add" element={<AddTenant />} />
        <Route path="/tenants/:id/show" element={<ShowTenant />} />
        <Route path="/tenants/:id/edit" element={<EditTenant />} />
        <Route path="/sizes" element={<Sizes />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/home" element={<Products />} />
        <Route path="/home/add" element={<AddProduct />} />
        <Route path="/home/:id/show" element={<ProductScreen />} />
        <Route path="/home/:id/edit" element={<EditProductScreen />} />
        <Route path="/stores" element={<Stores />} />
      </Route>
    </Routes>
  );
}

export default App;
