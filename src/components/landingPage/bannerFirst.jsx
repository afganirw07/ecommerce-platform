import React, { useState, useEffect } from "react";

// Daftar gambar
const images = [
  "https://i.pinimg.com/736x/3f/f5/d8/3ff5d8e89bb68c41e912fadafa6f5f33.jpg",
  "https://i.pinimg.com/736x/29/84/08/2984084e03fb883ceb36224ae5e9335b.jpg",
  "https://i.pinimg.com/736x/da/c8/79/dac879167f41d15ae9647c6f65416c5c.jpg"
];

// bagian bulat bulat
const BannerFirst = () => {
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
      <div className="px-4 sm:px-3 lg:px-16">
        <div className="relative w-full mt-5 h-48 sm:h-60 md:h-72 lg:h-80 xl:h-[300px] mx-auto overflow-hidden rounded-2xl shadow-lg ">
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
                  index === current ? "bg-red-500" : "bg-gray-400"
                } transition`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerFirst;
