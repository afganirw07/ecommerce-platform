import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Favorit = () => {
  // gambar
  const images = [
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/bltef08e86c0cbeee9d/67732aa41381a69cea47e1c5/Copy_of_Brand_Tile_Template_(14).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/bltf508ef069d2c8017/67732abe4667375164aa7d00/Copy_of_Brand_Tile_Template_(15).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt8f3fb8d07836edaf/67732cceb290b3406391f515/Copy_of_Brand_Tile_Template_(16).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blte56098b293a5c34e/67732bda05ab071f242c5451/Copy_of_Brand_Tile_Template_(17).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt3af747e7d82dae7d/6773217f776bc0b95427d1e3/Copy_of_Brand_Tile_Template_(7).png',
  ];

  return (
    <>
      {/* Text */}
      <div className="px-7 md:px-10 lg:px-30 xl:px-30 2xl:px-30 py-5">
        <div className="relative flex items-center justify-between">
          <h1 className="font-[poppins] text-lg font-semibold mb-3 mt-3 inline-flex items-center">
            Seasonal Favorites
          </h1>
          <p className="font-[poppins] text-red-600 inline-flex items-center cursor-pointer ">
            See All
            <ArrowForwardIosIcon
              className="text-red-600 ml-2"
              sx={{ fontSize: 12 }}
            />
          </p>
        </div>

        {/* baguan gmabr */}
        <div className="overflow-x-auto sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 min-w-[600px] sm:min-w-0">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-[200px] sm:w-auto shrink-0 sm:shrink rounded-xl p-2 relative transition cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorit;
