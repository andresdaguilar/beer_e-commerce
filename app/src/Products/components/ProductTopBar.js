import { Link } from 'react-router-dom';

const ProductNavBar = (props) => {
  return (
    <div className="product-top-bar">
      <Link to={'/products'} className="btn-nav">
        <img src="/icons/arrowBack.svg" alt="back"/>
      </Link>
      <div className="product-detail-title">Detail</div>
      <div className="btn-nav">
        <img src="/icons/iconOptions.svg" alt="options"/>
      </div>
    </div>
  )
}

export default ProductNavBar;