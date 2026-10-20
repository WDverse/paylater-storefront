import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { loadPaylaterScript } from '../paylater/loadPaylaterScript';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  useEffect(() => {
    loadPaylaterScript();
  }, []);

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
      <paylater-message amount={product.price.toFixed(2)} />
      <button type="button" onClick={() => addToCart(product.id)}>
        Add to cart
      </button>
    </article>
  );
}
