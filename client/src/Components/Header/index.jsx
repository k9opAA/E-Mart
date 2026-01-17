import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/e-mart logo.png';
import Button from '@mui/material/Button';
import CountryDropdown from '../CountryDropdown';
import { LuUser } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import SearchBox from './SearchBox';
import Navigation from './Navigation';

const Header=()=>{
    return(
        <div className="HeaderWrapper">
            <div className="top-stripe bg-purple">
                <div className="container">
                    <p className="mb-0 p-0 text-center">Welcome to <b>E-mart!</b> Your one-stop shop for all your needs.
                    </p>
                </div>
            </div>
            
            <header className='header'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='logoWrapper d-flex align-items-center col-sm-2'>
                            <Link to={'/'}>
                                <img src={logo} alt="E-mart Logo" />
                            </Link>
                        </div>

                        <div className='col-sm-10 d-flex align-items-center part2'>
                            <CountryDropdown/>
                            <SearchBox/>

                            <div className='part3 d-flex align-items-center'>
                                <button className='circle'>
                                    <LuUser/>
                                </button>
                                <div className='cartTab d-flex align-items-center'>
                                    <span className='price'>$3.29</span>
                                    <div className='position-relative'>
                                        <button className='circle cartBtn'>
                                            <BsHandbag/>
                                        </button>
                                        <span className='count d-flex align-items-center justify-content-center'>1</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>

            <Navigation/>
            
        </div>
    )
}
export default Header;