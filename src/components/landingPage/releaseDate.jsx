import React, { useEffect, useState } from "react";
import { Heart, CircleHelp } from "lucide-react";
import notRelease from "../../../public/notRelease.svg";

const ReleaseDate = () => {
  const [products, setProducts] = useState([
    {
      _id: 1,
      date: "Sep | 21",
      title: "Nike Air Max 270 MLB Series",
    },
    {
      _id: 2,
      date: "Jan | 11",
      title: "Nike Air Max Craze WMNS Series",
    },
    {
      _id: 3,
      date: "Aug | 4",
      title: 'Adidas Adizero Boston 13 "EQT"',
    },
    {
      _id: 4,
      date: "Jul | 24",
      title: "Balenciaga x PUMA Winter 25 Collection",
    },
    {
      _id: 5,
      date: "Aug | 8",
      title: "Travis Scott x Fragment Design x Air Jordan 1 Low",
    },
  ]);
  const [popover, setPopover] = useState(false);

  const handlePopoverToggle = () => {
    setPopover(!popover);
  };

  return (
    <div className="px-7 md:px-10 lg:px-30 xl:px-30 2xl:px-30">
      <div className="relative">
        <h2 className="font-[poppins] text-lg font-semibold mb-3 mt-3 inline-flex items-center">
        Release Calendar
        </h2>

        {popover && (
          <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm w-72 mt-2">
            <p>This section displays a list of products recommended for you based on your interests.</p>
          </div>
        )}
      </div>

      {/* product section */}
      <div className="overflow-x-auto sm:overflow-visible">
        <div className="flex sm:grid sm:grid-cols-5 gap-4 min-w-[600px] sm:min-w-0">
          {products.map((product) => (
            <div
              key={product._id}
              className="w-[160px] sm:w-auto shrink-0 sm:shrink rounded-xl border p-4 relative transition cursor-pointer"
            >
              {/* tanggal */}
              <div className="font-[poppins] text-sm font-semibold">{product.date}</div>

              {/* gambar */}
              <div className="relative flex justify-center items-center h-20 mb-2">
                <img src={notRelease} alt="Placeholder" className="h-full object-contain" />
              </div>

              {/* judul */}
              <p className="font-[poppins] mt-5 text-[14px] md:text-[16px] font-light leading-tight line-clamp-2">
                {product.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleaseDate;
