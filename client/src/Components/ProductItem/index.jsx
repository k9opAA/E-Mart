import { SlSizeFullscreen } from "react-icons/sl";
import Rating from '@mui/material/Rating';
import { FiHeart } from "react-icons/fi";

const ProductItem = ({ data }) => {
    
    if (!data) return null;

    return (
        <div className="item productItem">
            <div className="imgWrapper">
                <img src={data.images[0]} alt={data.name} className="w-100" />
                <span className="badge badge-primary">28%</span>
                <div className="action">
                    <button><SlSizeFullscreen /></button>
                    <button><FiHeart /></button>
                </div>
            </div>

            <div className="info">
                <h4>{data.name}</h4>
                <span className={`d-block ${data.InStock > 0 ? 'text-success' : 'text-danger'}`}>
                    {data.InStock > 0 ? "In Stock" : "Out of Stock"}
                </span>

                <Rating 
                    className="mt-2 mb-2" 
                    name="read-only" 
                    value={data.rating || 0} 
                    readOnly 
                    size="small" 
                    precision={0.5} 
                />

                <div className="d-flex">
                    <span className="netPrice text-danger ml-2">${data.price}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;