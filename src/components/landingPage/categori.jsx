import React from 'react';

const Categori = () => {
  return (
    <>
      {/* categori */}
      <div className="sticky top-[65px] sm:top-[82px] z-40 overflow-x-scroll sm:overflow-x-auto bg-white">
        <div
          className="flex font-[poppins] font-semibold gap-7 items-center justify-center 
                  bg-gray-100 h-[50px] cursor-pointer text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] 
                  text-black px-4 min-w-max whitespace-nowrap"
        >
          {[
            'Brands',
            'New',
            'Men',
            'Woman',
            'Kids',
            'Sneaker',
            'Shoes',
            'Apparel',
            'Accessories',
          ].map((item) => (
            <div key={item} className="relative group">
              <h1 className="transition duration-300 group-hover:text-gray-700">
                {item}
              </h1>
              {/* underline */}
              <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categori;
