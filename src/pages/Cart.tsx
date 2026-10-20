import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { items, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link to="/">Continue shopping</Link>
      </div>
    );
  }

  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div className="cart">
      <ul>
        {items.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return null;
          return (
            <li key={item.productId}>
              <span>
                {product.name} &times; {item.quantity}
              </span>
              <span>${(product.price * item.quantity).toFixed(2)}</span>
              <button type="button" onClick={() => removeFromCart(item.productId)}>
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <p className="total">Total: ${total.toFixed(2)}</p>
    </div>
  );
}
