import React from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "./customerReviews.css";

const CustomerReviews = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            comment: "Amazing shopping experience! The products arrived quickly and were exactly as described. Will definitely shop here again!",
            rating: 5,
            avatar: "SJ"
        },
        {
            id: 2,
            name: "Michael Chen",
            comment: "Great quality products at affordable prices. Customer service was very helpful when I had questions about my order.",
            rating: 5,
            avatar: "MC"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            comment: "Love this store! The variety of products is impressive and the checkout process is smooth. Highly recommend!",
            rating: 4,
            avatar: "ER"
        },
        {
            id: 4,
            name: "David Williams",
            comment: "Excellent service from start to finish. Fast delivery and the product quality exceeded my expectations.",
            rating: 5,
            avatar: "DW"
        },
        {
            id: 5,
            name: "Sophia Martinez",
            comment: "Best online shopping experience I've had! Everything was perfect from browsing to delivery. Five stars!",
            rating: 5,
            avatar: "SM"
        },
        {
            id: 6,
            name: "James Anderson",
            comment: "Good selection and competitive prices. The website is easy to navigate and my order arrived on time.",
            rating: 4,
            avatar: "JA"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar 
                key={index} 
                className={index < rating ? "star-filled" : "star-empty"} 
            />
        ));
    };

    return (
        <div className="customerReviewsSection">
            <div className="container">
                <div className="reviews-header">
                    <h2>What Our Customers Say</h2>
                    <p>Real reviews from real customers</p>
                </div>
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-slide">
                            <div className="review-card">
                                <div className="review-avatar">
                                    {review.avatar}
                                </div>
                                <div className="review-content">
                                    <h4 className="customer-name">{review.name}</h4>
                                    <div className="rating-stars">
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="review-comment">"{review.comment}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CustomerReviews;
