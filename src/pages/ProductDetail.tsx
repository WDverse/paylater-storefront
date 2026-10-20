import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link to="/">Back to products</Link>
      </div>
    );
  }

  return (
    <article className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p className="price">${product.price.toFixed(2)}</p>
      <button type="button" onClick={() => addToCart(product.id)}>
        Add to cart
      </button>
    </article>
  );
}
