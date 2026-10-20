import { Routes, Route, Link } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { useCart } from './context/CartContext';
import './App.css';

function App() {
  const { itemCount } = useCart();

  return (
    <>
      <nav className="site-nav">
        <Link to="/">Paylater Storefront</Link>
        <Link to="/cart">Cart ({itemCount})</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
