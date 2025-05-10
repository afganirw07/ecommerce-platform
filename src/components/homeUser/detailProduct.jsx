import React, { useState, useEffect } from "react";

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true); // Default open agar sesuai dengan gambar

    useEffect(() => {
        fetch('http://localhost:5000/api/products/68133e3d539b2a87d44ee6d4')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, []);

    if (!product) return <div>Loading...</div>;

    const sizes = [40, 41, 42, 43];

    return (
        <div className="p-6 py-14 max-w-4xl mx-auto font-[Poppins]">

            <div className="flex flex-col md:flex-row px-5">
                {/* Gambar Produk */}
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto object-contain"
                    />
                </div>


                <div className="md:w-1/2 md:pl-10">
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-4">
                        <span>Home / {product.category} / {product.brand}</span>
                    </div>
                     {/* Detail Produk */}
                    <h1 className="text-2xl font-bold uppercase">{product.title}</h1>
                    <p className="text-base text-gray-600 mt-1">{product.colorway}</p>
                    <p className="text-2xl font-bold mt-2">${product.retailPrice}</p>

                    {/* Pilihan Ukuran */}
                    <div className="mt-4">
                        <p className="text-sm font-medium">Sizes:</p>
                        <div className="flex gap-2 mt-2">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`border border-gray-300 px-3 py-1 text-sm ${selectedSize === size ? 'bg-gray-200' : 'bg-white'
                                        } hover:bg-gray-100`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Kontrol Kuantitas dan Tombol Aksi */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border border-gray-300">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 text-lg"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 text-lg"
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-red-500 text-white px-6 py-2 uppercase font-medium hover:bg-red-600">
                            Buy Now
                        </button>
                    </div>

                    {/* Tombol Tambahan */}
                    <div className="mt-4 flex gap-2">
                        <button className="border border-green-500 text-green-500 px-6 py-2 uppercase font-medium hover:bg-green-50">
                            Contact Us For Purchase
                        </button>
                        <button className="border border-gray-500 text-gray-500 px-6 py-2 uppercase font-medium hover:bg-gray-50">
                            Add To Cart
                        </button>
                    </div>

                    {/* Deskripsi Produk dengan Dropdown */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                            <h2 className="text-lg font-semibold uppercase">Description</h2>
                            <span>{isDescriptionOpen ? '▲' : '▼'}</span>
                        </div>
                        <hr className="my-2 border-t border-gray-300" />
                        {isDescriptionOpen && (
                            <>
                                <h3 className="text-base font-semibold uppercase">{product.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                            </>
                        )}
                        <hr className="mt-2 border-t border-gray-300" />
                    </div>

                    {/* SKU dan Kategori */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">SKU: N/A</p>
                        <p className="text-sm text-gray-600">Categories: {product.category}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;