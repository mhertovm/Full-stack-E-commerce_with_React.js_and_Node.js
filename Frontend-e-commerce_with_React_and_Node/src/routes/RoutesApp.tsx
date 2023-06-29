import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "../layouts/Layouts"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from '../pages/Register';
import Category from '../components/Category';
import Product from '../components/Product';
import Admin from '../admin/Admin';
import ProductTable from '../admin/productCRUD/ProductTable';
import Search from '../components/Search';
import AllProducts from '../components/AllProducts';
import ProductAdd from '../admin/productCRUD/ProductAdd';
import Dashboard from '../admin/dashboard/Dashboard';
import ProductUpdate from '../admin/productCRUD/ProductUpdate';
import CategoryTable from '../admin/categoryCRUD/CategoryTable';
import CategoryAdd from '../admin/categoryCRUD/CategoryAdd';
import CategoryUpdate from '../admin/categoryCRUD/CategoryUpdate';
import NavbarTable from '../admin/navbarCRUD/NavbarTable';
import NavbarAdd from '../admin/navbarCRUD/NavbarAdd';
import NavbarUpdate from '../admin/navbarCRUD/NavbarUpdate';
import SaleProducts from '../components/SaleProduct';
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {!token ? 
        <>
        <Route path='/login' element={<Login />}/>;
        <Route path='/register' element={<Register />}/>;
        </>
        : false
        }
        <Route path="/" element={<Home />}/>;
        <Route path='/products/:productId' element={<Product />}/>;
        <Route path="/categories/:category" element={<Category />}/>;
        <Route path="/search" element={<Search />}/>;
        <Route path="/allproducts" element={<AllProducts/>}/>;
        <Route path="/saleproducts" element={<SaleProducts/>}/>;
      </Route>
      {token && role ==="admin" ? 
      <Route element={<Admin/>}>
        <Route path='/product-add' element={<ProductAdd />}/>;
        <Route path='/category-add' element={<CategoryAdd/>}/>;
        <Route path='/navbar-add' element={<NavbarAdd/>}/>;
        <Route path='/product-dellupd' element={<ProductTable />}/>;
        <Route path='/category-dellupd' element={<CategoryTable/>}/>;
        <Route path='/navbar-dellupd' element={<NavbarTable/>}/>;
        <Route path='/dashboard' element={<Dashboard/>}/>;
        <Route path='/product-update/:productId' element={<ProductUpdate/>}/>;
        <Route path='/category-update/:categoryId' element={<CategoryUpdate/>}/>;
        <Route path='/navbar-update/:navbarId' element={<NavbarUpdate/>}/>;
      </Route>
       : false
      }
    </Routes>
  );
}
  
export default AppRoutes