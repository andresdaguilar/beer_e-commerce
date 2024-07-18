import { Link } from 'react-router-dom';
import { updateImageName } from '../helper';

const ProductListItem = (props) => {
  const { product } = props;
  
  return (
    <div key={product.id} className="product-card">
          <h2>{product.brand}</h2>
          <img src={`/icons${updateImageName(product.image)}`} className="productImage" alt={product.brand} />
          
          <p>${product.price}</p>
          <Link to={`/products/${product.id}-${product.brand.split(" ").join("-").toLowerCase()}`} className="add-button">+</Link>
        </div>
  );
}
export default ProductListItem;
