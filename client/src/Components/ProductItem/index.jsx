import { SlSizeFullscreen } from "react-icons/sl";
import Rating from '@mui/material/Rating';
import { FiHeart } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductItem = ({ data }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    
    if (!data) return null;

    const handleAddToCart = () => {
        addToCart(data);
        toast.success(`${data.name} added to cart!`, {
            position: 'bottom-right',
            autoClose: 2000
        });
    };

    const handleViewDetails = () => {
        navigate(`/product/${data._id || data.id}`);
    };

    return (
        <div className="item productItem">
            <div className="imgWrapper">
                <img src={data.images[0]} alt={data.name} className="w-100" />
                <span className="badge badge-primary">28%</span>
                <div className="action">
                    <button onClick={handleViewDetails} title="View Details">
                        <SlSizeFullscreen />
                    </button>
                    <button title="Add to Wishlist"><FiHeart /></button>
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

                <div className="d-flex align-items-center justify-content-between">
                    <span className="netPrice text-danger ml-2">${data.price}</span>
                    <button 
                        className="btn-add-to-cart"
                        onClick={handleAddToCart}
                        disabled={data.InStock <= 0}
                    >
                        <BsHandbag /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;