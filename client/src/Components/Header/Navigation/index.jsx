import Button from '@mui/material/Button';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = () => {
    const [isCatOpen, setIsCatOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/category'); 
                const data = await response.json();
                
                setCategories(data); 

            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return(
        <nav>
                <div className="container">
                    <div className='row'>
                        <div className='col-sm-3 navPart1'>
                            <button className='allCatTab align-items-center' onClick={() => setIsCatOpen(!isCatOpen)}>
                                <span className='icon1'><IoMenu/></span>
                                <span className='text'>All Categories</span>
                                <span className='icon2'><FaAngleDown/></span>
                            </button>
                            <div className={`sidebarNav shadow ${isCatOpen ? 'open' : ''}`}>
                                <ul>
                                    {categories.length > 0 && categories.map((cat, index) => (
                                        <li key={index}>
                                            <Link to={`/category/${cat.name.toLowerCase()}`}>
                                                <button>{cat.name}</button>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className='col-sm-9 navPart2 d-flex align-items-center'>
                            <ul className='list list-inline ml-auto'>
                                <li className='list-inline-item'><Link to="/">Home</Link></li>
                                <li className='list-inline-item'>
                                    <Link to="/fashion">Fashion</Link>
                                    <div className='submenu shadow'>
                                        <Link to="/fashion/clothing">Clothing</Link>
                                        <Link to="/fashion/footwear">Footwear</Link>
                                        <Link to="/fashion/watches">Watches</Link>
                                    </div>
                                </li>
                                <li className='list-inline-item'>
                                    <Link to="/electronics">Electronics</Link>
                                    <div className='submenu shadow'>
                                        <Link to="/electronics/mobiles">Mobiles</Link>
                                        <Link to="/electronics/laptops">Laptops</Link>
                                        <Link to="/electronics/accessories">Accessories</Link>
                                    </div>
                                </li>
                                <li className='list-inline-item'><Link to="/about">About us</Link></li>
                                <li className='list-inline-item'><Link to="/contact">Contact us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
        </nav>
    )
}

export default Navigation;