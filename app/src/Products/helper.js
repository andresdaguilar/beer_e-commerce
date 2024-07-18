import axios from 'axios';

export const fetchProducts = async () => {
  const productResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
  return productResponse.data;
}

//Since the products.js doesn't include the icon filename, I've addes into the icons folder keepeing the original name but in png format to keep the transparent background
//(also added the Lagunitas image because it wasn't included in the zip provided)
export const updateImageName = (fileName) => {
  const extensionIndex = fileName.lastIndexOf('.');    
  if (extensionIndex !== -1) {
    return fileName.substring(0, extensionIndex) + '.png';
  }
  return fileName + '.png';
}