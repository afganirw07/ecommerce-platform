import React from "react";

const BannerProduct = () => {
    const imagesLandscape = "https://i.pinimg.com/736x/a1/f8/8d/a1f88d16e38a019bc0c54816d422349f.jpg";
    const imagesPotrait = "https://i.pinimg.com/736x/0c/c1/be/0cc1beb9547b5ff62eca96e03092067f.jpg";

    return (
        <div className="px-7 md:px-10 lg:px-30 xl:px-30 2xl:px-30">
            <div className="sm:grid sm:grid-cols-5 sm:grid-rows-4 gap-6 py-5">
                
                <div className="hidden sm:block sm:col-span-3 sm:row-span-4 rounded-lg overflow-hidden cursor-pointer">
                    <img
                        src={imagesPotrait}
                        alt="Banner Potrait"
                        className="w-full h-full object-cover"
                    />
                </div>

        
                <div className="block sm:col-span-2 sm:col-start-4 sm:row-span-4 rounded-lg overflow-hidden cursor-pointer">
                    <img
                        src={imagesLandscape}
                        alt="Banner Landscape"
                        className="w-full h-auto sm:h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
