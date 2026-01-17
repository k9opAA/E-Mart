import React from "react";
import Slider from "react-slick";
import slider1 from '../../assets/image/slider 1.jpg';
import slider2 from '../../assets/image/slider 2.jpg';
import slider3 from '../../assets/image/slider 3.jpg';
import slider4 from '../../assets/image/slider 4.jpg';
import slider5 from '../../assets/image/slider 5.jpg';



const HomeBanner=()=>{

    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 1800,
  };
    
    return(
        <div className="homeBannerSection">
            <div className="container">
                <Slider {...settings}>
                    <div className="item">
                        <img src={slider1} className="w-100" alt="" />
                    </div>
                    <div className="item">
                        <img src={slider2} className="w-100" alt="" />
                    </div>
                    <div className="item">
                        <img src={slider4} className="w-100" alt="" />
                    </div>
                    <div className="item">
                        <img src={slider5} className="w-100" alt="" />
                    </div>
                </Slider>
            </div>
        </div>
    )
}  

export default HomeBanner;