import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import addToCart from '../../service/cartAPI';
import toast, { Toaster } from 'react-hot-toast';
import { addToFavorite} from '../../service/favoriteAPI';


const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true); // default

    // ambil id
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id || user?.id;


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // add to cart
    const handleAddToCart = async () => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to add items to your cart');
                return;
            }
            await addToCart(userId, product._id, quantity, product.colorway || 'N/A', selectedSize);
            toast.success('Successfully added to cart!')
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }
    
    // ambil data product
    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    // add to favorite
    const handleAddToFavorite = async () => {
        if (!selectedSize) {
            toast.error('Please select a size');
            return;
        }
        if (!userId) {
            toast.error('Please login to add items to your favorites');
            return;
        }
        try {
            await addToFavorite(userId, product._id, selectedSize);
            toast.success('Successfully added to favorites!');
        } catch (error) {
            console.error('Error adding to favorites:', error);
            toast.error('Failed to add to favorites');
        }
    };

    if (!product) return;

    // size
    const sizes = ['S', 'M', 'L', 'XL'];

    return (
        <div className="p-6 py-14 max-w-7xl mx-auto font-[Poppins]">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col md:flex-row px-5">
                {/* gambar product*/}
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-auto object-contain"
                    />
                </div>

                <div className="md:w-1/2 md:pl-10">
                    {/* breadcrumb */}
                    <div className="text-sm text-gray-500 mb-4">
                        <span>
                            {product.category} / {product.brand}
                        </span>
                    </div>
                    {/* detail produk */}
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-base text-gray-600 mt-2">{product.colorway}</p>
                    <p className="text-2xl font-semibold mt-2 opacity-70">
                        $ {product.retailPrice}
                    </p>

                    {/* ukuran */}
                    <div className="mt-4">
                        <p className="font-[poppins] text-sm font-medium">
                            {product.brand} Sizes:
                        </p>
                        <div className="flex gap-2 mt-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`border border-gray-300 rounded px-3 py-1 text-sm ${selectedSize === size
                                        ? 'bg-red-500 text-white'
                                        : 'bg-white cursor-pointer'
                                        } hover:bg-red-500 hover:text-white`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Kontrol Kuantitas dan Tombol Aksi */}
                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center border rounded border-gray-300">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 text-lg cursor-pointer"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 text-lg ">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 text-lg cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                        <button className="bg-red-500 rounded text-white px-6 py-2 uppercase font-semibold cursor-pointer sm: hover:bg-red-700">
                            Buy Now
                        </button>
                    </div>

                    {/* add button */}
                    <div  className="mt-4 flex gap-2 font-[poppins] font-semibold">
                        <button onClick={handleAddToFavorite} className="border bg-green-500 rounded text-white px-6 uppercase py-2 cursor-pointer hover:bg-green-600">
                            Add To Favorites
                        </button>
                        <button onClick={handleAddToCart} className="border bg-red-500 rounded text-white px-6 py-2 cursor-pointer uppercase hover:bg-red-700">
                            Add To Cart
                        </button>
                    </div>

                    {/* decs */}
                    <div className="mt-6">
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                        >
                            <h2 className="text-lg font-semibold uppercase">Description</h2>
                            <span>{isDescriptionOpen ? '▲' : '▼'}</span>
                        </div>
                        <hr className="my-2 border-t border-gray-300" />
                        {isDescriptionOpen && (
                            <>
                                <h3 className="text-base font-semibold mt-3 uppercase">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-2">
                                    {product.description}
                                </p>
                            </>
                        )}
                        <hr className="mt-2 border-t border-gray-300" />
                    </div>

                    {/* SKU dan Kategori */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            {' '}
                            <span className="text-black font-semibold">SKU:</span> N/A
                        </p>
                        <p className="text-sm text-gray-600">
                            {' '}
                            <span className="text-black font-semibold">Categories:</span>{' '}
                            {product.category}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
