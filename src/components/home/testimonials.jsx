import React, { useState, useEffect } from 'react';
import Raj from '../../components/assets/Raj_Kumar.jpg'
import Neha from '../../components/assets/Neha_Sharma.jpg'
import Priya from '../../components/assets/Priya_Gupta.jpg'
import Aditya from '../../components/assets/Aditya_Kapoor.jpg'
import Sadiq from '../../components/assets/Sadiq_Basha.jpg'
import Nayum from '../../components/assets/Nayum.jpg'
import Aisha from '../../components/assets/Aisha.jpg'
import Navbar from '../Navbar/Navbar';

import { Link } from 'react-router-dom';

const TestimonialsSlider = () => {
    const testimonials = [
        {
            quote: "I was impressed by the attention to detail and the personalized service provided by the Indian tourism website. They made sure we experienced the true essence of India during our trip.",
            author: "Raj Kumar",
            city: "Delhi",
            image: Raj,
            rating: 5
        },
        {
            quote: "The team at the Indian tourism website was incredibly helpful in planning our trip. They tailored the itinerary to our preferences and made sure we had an unforgettable experience.",
            author: "Neha Sharma",
            city: "Mumbai",
            image: Neha,
            rating: 4
        },
        {
            quote: "The Indian tourism website provided us with an unforgettable experience. The guides were knowledgeable and the accommodations were top-notch. We can't wait to plan our next trip with them.",
            author: "Priya Gupta",
            city: "Punjab",
            image: Priya,
            rating: 3
        },
        {
            quote: "The Indian tourism website made planning our trip to India a breeze. They took care of all the logistics and recommended the best places to visit. We had an amazing time and can't wait to go back.",
            author: "Aditya Kapoor",
            city: "Chennai",
            image: Aditya,
            rating: 5
        },
        {
            quote: "The tour package was amazing! The guides were knowledgeable and the itinerary was well-planned. I had a wonderful time exploring the cultural and historical sights of India.",
            author: "Sadiq Basha",
            city: "Bangalore",
            image: Sadiq,
            rating: 4
        },
        {
            quote: 'I had an incredible experience with your tourism services. The attention to detail and personalized itinerary made my trip to India unforgettable. I would highly recommend your company to anyone looking to explore the wonders of this beautiful country.',
            author: "Nayum",
            city: "Hyderabad",
            image: Nayum,
            rating: 4
        },
        {
            quote: "I was blown away by the level of service and attention to detail provided by your team. The transportation, accommodations, and activities were all top-notch. I can't wait to plan my next trip to India with your help.",
            author: "Aisha Khan",
            city: "Vizag",
            image: Aisha,
            rating: 3
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(currentSlide === testimonials.length - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <svg key={i} className="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a.75.75 0 0 1 .605.32l2.42 3.289 3.864.568a.75.75 0 0 1 .416 1.279l-2.896 2.842.684 4.005a.75.75 0 0 1-1.088.791L10 14.667l-3.59 1.884a.75.75 0 0 1-1.088-.79l.684-4.006-2.897-2.842a.75.75 0 0 1 .416-1.28l3.863-.567L9.395 1.32A.75.75 0 0 1 10 1zm0 2.445L8.615 6.327a.75.75 0 0 1-.564.41l-3.04.445 2.23 2.183a.75.75 0 0 1 .216.664l-.527 3.085 2.768-1.455a.75.75 0 0 1 .704 0l2.768 1.455-.528-3.085a.75.75 0 0 1 .216-.664l2.23-2.182-3.04-.446a.75.75 0 0 1-.564-.41L10 3.445v.001z" clipRule="evenodd" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <section className="bg-gray-100 py-16">
              <Navbar/>
            <div className="max-w-3xl mx-auto relative">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Clients Say</h2>
                {/* <p className="">Hear from our happy customers about their experiences with our Indian tourism services.</p> */}
                <p className="text-center text-xl text-gray-600 mb-1 md:mb-1">Hear from our happy customers about their experiences with our Indian tourism services.</p>
                <div className="overflow-hidden">
                    <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="w-full flex-shrink-0 flex items-center justify-center px-8 py-8">
                                <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto flex flex-col items-center">
                                    <img src={testimonial.image} alt={testimonial.author} className="w-40 h-40 rounded-full mb-4 object-cover" />
                                    <div className="text-lg text-center italic text-gray-700 mb-4">{testimonial.quote}</div>
                                    <div className="flex mb-2">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                    <div className="text-gray-800 text-lg font-semibold">{testimonial.author}</div>
                                    <div className="text-gray-800 ">{testimonial.city}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="absolute top-[350px] transform -translate-y-1/2 left-0 w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none" onClick={prevSlide}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="absolute top-[350px] transform -translate-y-1/2 right-0 w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 focus:outline-none" onClick={nextSlide}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default TestimonialsSlider;
