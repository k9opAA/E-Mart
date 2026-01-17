import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const HomeCat = () => {
    return (
        <>
            <section className="homeCat">
                <div className="container">
                    <h3 className="mb-4 hd">Featured Categories</h3>
                    <div className="AllCat">
                        <div className="item text-center cursor">
                                    <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" alt="" />
                                    <h6>Fashion</h6>
                        </div>
                        <div className="item text-center cursor">
                            <img src="https://api.spicezgold.com/download/file_1734525218436_ele.png" alt="" />
                            <h6>Electronics</h6>
                        </div>
                        <div className="item text-center cursor">
                            <img src="https://api.spicezgold.com/download/file_1734525239704_foot.png" alt="" />
                            <h6>Footwear</h6>
                        </div>
                        <div className="item text-center cursor">
                            <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" alt="" />
                            <h6>Watches</h6>
                        </div>
                        <div className="item text-center cursor">
                            <img src="https://api.spicezgold.com/download/file_1734525218436_ele.png" alt="" />
                            <h6>Mobiles</h6>
                        </div>
                        <div className="item text-center cursor">
                            <img src="https://api.spicezgold.com/download/file_1734525231018_bag.png" alt="" />
                            <h6>Laptops</h6>
                        </div>
                    </div>

                </div>
            </section> 
        </>
    );
}

export default HomeCat;