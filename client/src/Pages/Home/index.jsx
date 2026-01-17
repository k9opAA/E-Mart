import HomeBanner from "../../Components/HomeBanner";
import CustomerReviews from "../../Components/CustomerReviews";
import banner1 from '../../assets/image/banner-01.jpg';
import banner2 from '../../assets/image/banner-02.jpg';
import { FaArrowRightLong } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

const Home = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/api/products")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data);
            })
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    return (
        <>
            <HomeBanner />
            <HomeCat />

            <section className="homeProducts">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-md-3">
                            <div className="banner">
                                <img src={banner1} className="cursor" />
                            </div>
                            <div className="banner mt-3">
                                <img src={banner2} className="cursor" />
                            </div>
                        </div> */}

                        <div className="col-md-15">
                            <div className="d-flex align-items-center productRow">
                                <div className="info">
                                    <h3 className="mb-0 hd">BEST SELLERS</h3>
                                    <p className="text-light text-sml mb-0">Do not miss the current offers until the end of the month.</p>
                                </div>
                                <button className="viewAllBtn ml-auto" onClick={() => navigate('/products')}>View All <FaArrowRightLong /></button>
                            </div>

                            <div className="product_row w-100 mt-4">
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={10}
                                    navigation={true}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                    {products.length !== 0 && products.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <ProductItem data={item} />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <CustomerReviews />
        </>
    )
}

export default Home;