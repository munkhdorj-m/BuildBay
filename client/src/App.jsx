import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import UserProfile from "./pages/UserProfile";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const user = true;
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/products" element={<ProductList />}>
        <Route path=":category" element={<ProductList />} />
      </Route>
    </Routes>
  );
}

export default App;
