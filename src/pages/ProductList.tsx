import { Link } from 'react-router-dom';
import { products } from '../data/products';

export function ProductList() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`}>View details</Link>
        </article>
      ))}
    </div>
  );
}
