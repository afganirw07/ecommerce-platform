import React, { useState, useEffect } from 'react';

// Daftar gambar
const images = [
  'https://img.freepik.com/premium-psd/psd-best-shoes-sale-black-red-advertisement-social-media-facebook-cover-banner-template_797457-198.jpg',
  'https://i.pinimg.com/736x/29/84/08/2984084e03fb883ceb36224ae5e9335b.jpg',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shoes-sale-banner-design-template-527235d9c5291603dfec6898f99f7376_screen.jpg',
];

// bagian bulat bulat
const secondBanner = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 2000);
    return () => clearInterval(interval);
  }, [length]);

  return (
    <>
      {/* wrapper */}
      <div className="px-4 sm:px-7 lg:px-30">
        <div className="relative w-full mt-5 h-48 sm:h-60 md:h-72 lg:h-80 xl:h-[230px] mx-auto overflow-hidden rounded-2xl shadow-lg ">
          {/* banner */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full flex-shrink-0 object-cover sm:object-cover md:object-contain lg:object-cover"
              />
            ))}
          </div>

          {/* bulat bulat */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === current ? 'bg-red-500' : 'bg-gray-400'
                } transition`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default secondBanner;
