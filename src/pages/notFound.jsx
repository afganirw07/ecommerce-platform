import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const notFound = () => {

    // haddle button
    const navigate = useNavigate()
    const handleRegisOnclick = () => {
        navigate('/')
    }

    // ubah judul
    useEffect(() => {
        document.title = "Not Found";
        return () => {
            document.title = "ReKicks | Style in Every Step";
        };
    }, []);


    return (
         <section className="bg-white min-h-screen flex items-center justify-center px-4">
      <div className="max-w-screen-sm text-center">
        <h1 className="text-6xl lg:text-8xl font-extrabold text-black mb-4">
          404
        </h1>
        <p className="text-xl lg:text-2xl font-semibold text-black opacity-70 mb-2">
          Halaman tidak ditemukan
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Maaf, halaman yang kamu cari tidak tersedia. Silakan kembali ke beranda.
        </p>
        <button
          onClick={handleRegisOnclick}
          className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 transition"
        >
          Kembali ke Beranda
        </button>
      </div>
    </section>

    )

}

export default notFound;