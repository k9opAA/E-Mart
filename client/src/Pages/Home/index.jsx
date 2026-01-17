import HomeBanner from "../../Components/HomeBanner";
import Button from '@mui/material/Button';
import banner1 from '../../assets/image/banner-01.jpg';
import banner2 from '../../assets/image/banner-02.jpg';
import { FaArrowRightLong } from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "../../Components/ProductItem";
import { SlSizeFullscreen } from "react-icons/sl";
import product1 from '../../assets/image/product1.jpg';
import Rating from '@mui/material/Rating';
import { IoIosArrowForward } from "react-icons/io";
import HomeCat from "../../Components/HomeCat";


const Home=()=>{

    var productSliderOptions = {
        items: 4,
        nav: true,
        rewind: true,
        autoplay: true
    };
    return(
        <>
            <HomeBanner/>

            <HomeCat/>

            <section className="homeProducts">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="banner">
                                <img src={banner1} className="cursor" />
                            </div>
                            <div className="banner mt-3">
                                <img src={banner2} className="cursor" />
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="d-flex align-items-center productRow">
                                <div className="info">
                                    <h3 className="mb-0 hd">BEST SELLERS</h3>
                                    <p className="text-light text-sml mb-0">Do not miss the current offers until the end of the month.</p>
                                </div>

                                <button className="viewAllBtn ml-auto">View All <FaArrowRightLong /></button>
                            </div>

                            <div className="product_row w-100 mt-4">
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={0}
                                    navigation={true}
                                    pagination={{
                                    clickable: true,
                                    }}
                                    modules={[Navigation]}
                                    className="mySwiper" 
                                >
                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    <SwiperSlide>
                                        <ProductItem/>
                                    </SwiperSlide>

                                    
                                </Swiper>
                            </div>

                            <div className="d-flex align-items-center productRow mt-4">
                                <div className="info">
                                    <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                                    <p className="text-light text-sml mb-0">New products with updated stocks.</p>
                                </div>
                                <button className="viewAllBtn ml-auto">View All <FaArrowRightLong /></button>
                            </div>

                            <div className="product_row productRow2 w-100 mt-4 d-flex">
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                                <ProductItem/>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;