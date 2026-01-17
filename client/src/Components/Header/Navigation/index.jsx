import Button from '@mui/material/Button';
import { IoMenu } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navigation=()=>{
    const [isCatOpen, setIsCatOpen] = useState(false);

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
                                    <li><Link to="/category/fruits"><button>Fruits & Vegetables</button></Link></li>
                                    <li><Link to="/category/bakery"><button>Bakery & Biscuits</button></Link></li>
                                    <li><Link to="/category/meat"><button>Meat & Seafood</button></Link></li>
                                    <li><Link to="/category/beverages"><button>Beverages</button></Link></li>
                                    <li><Link to="/category/snacks"><button>Snacks & Branded Foods</button></Link></li>
                                    <li><Link to="/category/beauty"><button>Beauty & Health</button></Link></li>
                                    <li><Link to="/category/home"><button>Home & Cleaning</button></Link></li>
                                    <li><Link to="/category/dairy"><button>Dairy & Eggs</button></Link></li>
                                    <li><Link to="/category/pet"><button>Pet Care</button></Link></li>
                                    <li><Link to="/category/baby"><button>Baby Care</button></Link></li>
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