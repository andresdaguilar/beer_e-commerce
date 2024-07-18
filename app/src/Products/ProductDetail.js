import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductTopBar from "./components/ProductTopBar.js";
import { fetchProducts, fetchStockAndprice } from './helper.js';
import axios from 'axios';
import { updateImageName } from './helper.js';
import "./products.css";
import ReadMoreText from './components/ReadMore.js';
import SizeSelector from './components/SizeSelector.js';

const ProductDetail = (props) => {  
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [stockPrice, setStockPrice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ currentSelection, setCurrentSelection ] = useState(null);

  const productId = id.split("-")[0];

  const updateCurrentSelection = (code) => {
    //Find the stock and price from the product for the selected code
    const stockPrice = product.stockAndPrices.find(x => x.code === code);
    
    //Update the current selection
    setCurrentSelection({
      code: code,
      stock: stockPrice.stock,
      price: stockPrice.price
    })
  }

  const addToCart = (id, sku) => {
    console.log("Add to cart", id, sku);
    window.alert(`Add to cart: Product ID ${id}, SKU ${sku} `);
  }

  useEffect(() => {
    const fetchProductsInfo = async () => {
      // In a production ready app, the Details page should get the ID and make a request to the API to fetch the product data 
      // (including price and stock)
      // In this scenario since all this information is already in the browser, it could be stores in the localStorage of IndexDb, 
      // but that wouldn't be a good practice.

      const productId = id.split("-")[0];
      try {
        const products = await fetchProducts();
        const productDetail = products.find(x => x.id == productId);        
        if (!productDetail){
          //show error: product not found
        }else{
          setProduct(productDetail);
          const pricePromises = productDetail.skus.map(sku =>
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stock-price/${sku.code}`).then(priceResponse => ({
              code: sku.code,
              name: sku.name,
              price: priceResponse.data.price,
              stock: priceResponse.data.stock
            }))
          );
  
          const stockAndPrices = await Promise.all(pricePromises);          
          const newProduct = {...productDetail, stockAndPrices};
          setProduct(newProduct);
          
          setCurrentSelection({
            code: newProduct.stockAndPrices[0].code, 
            stock: newProduct.stockAndPrices[0].stock, 
            price: newProduct.stockAndPrices[0].price
          })                
          
          setLoading(false);
        }       
      } catch (err) {
        //setError(err);
        console.log(err)
        setLoading(false);
      }
    };
    fetchProductsInfo();
    const interval = setInterval(fetchProductsInfo, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount

  }, []);
  return (
    <div className="container product-page-details">
      <ProductTopBar/>
      {loading && (
        <div>Loading...</div>
      )}
      {!loading && !errorMessage && (
        <div className="product-details">
          <img src={`/icons${updateImageName(product.image)}`} alt={product.brand} />
          <div className="product-details-card">
            <div className="product-brand-price">
              <p className="product-brand">{product.brand}</p>
              {/* The price shown in the Figma file shows a format with 2 decimal digits. 
              Since the stock-price.js has prices with a 4 figures integer, I'm not sure if I should convert 2840 into 28.40 or display 2840.00 } */}
              {currentSelection && currentSelection.price && 
                <p className="product-price">${currentSelection.price}</p>
              }              
            </div>
            <p className="product-origin">Origin: {product.origin} | Stock: {currentSelection.stock || "N/A"}</p>
            <div className="product-description">
              <p>Description</p>
              <ReadMoreText text={product.information}/>
            </div>
            <SizeSelector skus={product.stockAndPrices} currentCode={currentSelection.code} updateCurrentSelection={updateCurrentSelection}/>
            
            {/* Is not clear the functional difference between "Add to bag" button and the "Add to cart" one */}
            <div className="product-cta">
              <div className="product-add-to-bag">
                <img src="/icons/bagIcon.svg" alt="add to bag"/>
              </div>
              <div className="btn-primary" onClick={() => addToCart(productId, currentSelection.code)}>
                Add to cart
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
export default ProductDetail;

