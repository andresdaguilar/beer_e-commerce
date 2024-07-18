import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './products.css'; 
import ProductListItem from './components/ProductListItem';

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      //I needed to make a multiple requests because the API endpoint only returns stock/price for a single ID. 
      //This can be improved by returning stock/price along with the product list
      try {
        const productResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        const products = productResponse.data;

        const pricePromises = products.map(product =>
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stock-price/${product.skus[0].code}`).then(priceResponse => ({
            ...product,
            price: priceResponse.data.price,
          }))
        );

        const productsWithPrices = await Promise.all(pricePromises);
        setProducts(productsWithPrices);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // clear the interval on unmount
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container2">
    <h1 className="products-title">Our Products</h1>
    <div className="product-grid">
      {products.map((product, i) => (
        <ProductListItem key={i} product={product}/>
      ))}
    </div>
  </div>
  );
}
export default ProductList;
