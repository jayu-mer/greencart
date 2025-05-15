import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";

// Pages
import Home from "./Pages/Home";
import AllProduct from "./Pages/AllProduct";
import ProductCategory from "./Pages/ProductCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders";

// Seller Pages
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./Pages/seller/SellerLayout";
import AddProduct from "./Pages/seller/AddProduct";
import ProductList from "./Pages/seller/ProductList";
import Orders from "./Pages/seller/Orders";

const App = () => {
  const { showUserLogin, isSeller } = useAppContext();
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProduct />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Seller routes */}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            {/* Child routes under SellerLayout */}
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
