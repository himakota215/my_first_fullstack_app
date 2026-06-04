import React from 'react';
import styles from './ProductCard.module.css'; // Import the styles
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.productCard}> {/* Use the imported styles */}
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;