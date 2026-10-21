import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { loadPaylaterScript } from '../paylater/loadPaylaterScript';

const SIZES = [
  { label: 'Small', priceDelta: -10 },
  { label: 'Medium', priceDelta: 0 },
  { label: 'Large', priceDelta: 15 },
];

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [size, setSize] = useState(SIZES[1]);

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

  const price = product.price + size.priceDelta;

  return (
    <article className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p className="price">${price.toFixed(2)}</p>

      <label>
        Size:{' '}
        <select
          value={size.label}
          onChange={(e) =>
            setSize(SIZES.find((s) => s.label === e.target.value) ?? SIZES[1])
          }
        >
          {SIZES.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}
            </option>
          ))}
        </select>
      </label>

      <paylater-message amount={price.toFixed(2)} />
      <button type="button" onClick={() => addToCart(product.id)}>
        Add to cart
      </button>
    </article>
  );
}
