import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PopularBrand = () => {
  // gambar
  const images = [
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blte08f252776d5834f/6773260836f5cc36f9db1b35/Copy_of_Brand_Tile_Template_(10).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/bltc5a55f409dcd724d/6773257bb290b35ed991f4f6/Copy_of_Brand_Tile_Template_(9).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt7de4e73e15b4ad06/67a2992aecc9d7c5f9413fce/Copy_of_Brand_Tile_Template_(24).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt53990f215de13e8e/67732787775da7112d1f51d0/Copy_of_Brand_Tile_Template_(13).png',
    'https://images-cs.stockx.com/v3/assets/blt818b0c67cf450811/blt67260f9960b40bc3/67732801776bc04ff327d1fc/Copy_of_Brand_Tile_Template_(12).png',
  ];

  return (
    <>
      {/* Text */}
      <div className="px-7 md:px-10 lg:px-30 xl:px-30 2xl:px-30 py-5">
        <div className="relative flex items-center justify-between">
          <h1 className="font-[poppins] text-lg font-semibold mb-3 mt-3 inline-flex items-center">
            Popular Brand
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

export default PopularBrand;
