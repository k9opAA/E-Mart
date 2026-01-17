import { SlSizeFullscreen } from "react-icons/sl";
import product1 from '../../assets/image/product1.jpg';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { FiHeart } from "react-icons/fi";

const ProductItem = () => {
        
        return (
                <div className="item productItem">
                        <div className="imgWrapper">
                                <img src={product1} alt="" />
                                <span className="badge badge-primary">28%</span>
                                <div className="action">
                                        <button><SlSizeFullscreen /></button>
                                        <button><FiHeart /></button>
                                </div>
                        </div>
                        <div className="info">
                                <h4>Men Alias-N Regular Fit Spread Collar Shirt</h4>
                                <span className="text-success d-block">In Stock</span>
                                <Rating className="mt-2 mb-2" name="read-only" value={5} readOnly size="small" precision={0.5}/>

                                        <div className="d-flex">
                                                <span className="oldPrice">$20.00</span>
                                                <span className="netPrice text-danger ml-2">$14.00</span>
                                        </div>
                        </div>
                </div>
        );

}


export default ProductItem;