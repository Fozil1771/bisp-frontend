import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Hero = () => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      >
        <SwiperSlide>
          <div className="relative">
            <img
              className="w-full h-[720px] object-cover"
              src="https://images.unsplash.com/photo-1616531770192-6eaea74c2456?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Replace with your image URL
              alt="Slide 1"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
              <h2 className="text-4xl font-bold mb-2">Empower Your Learning Journey</h2>
              <p className="text-lg">Explore Limitless Possibilities with Online Education</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              className="w-full h-[720px] object-cover"
              src="https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  // Replace with your image URL
              alt="Slide 2"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
              <h2 className="text-4xl font-bold mb-2">Unlock Your Potential Online</h2>
              <p className="text-lg">Elevate Your Skills with Seamless Online Education</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
