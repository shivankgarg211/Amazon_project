//import logo from './logo.svg';

import './App.css';
import Category from './component/Category';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './component/Dashboard';
import Product from './component/Product';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
        </Route>
        <Route path='/category' element={<Category />}></Route>
        <Route path='/product' element={<Product />}></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
