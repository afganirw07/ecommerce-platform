// import React from "react";

// const ProductScroller = ({ products }) => {
//   return (
//     <div className="mt-2 w-full overflow-x-auto scrollbar-hide">
//       <div className="inline-flex gap-4 pb-2"> {/* Ubah dari grid ke flex untuk kontrol lebih baik */}
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="flex-shrink-0 cursor-pointer w-[150px] sm:w-[180px] bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-28 sm:h-32 object-cover rounded-t-xl"
//             />
//             <div className="p-2">
//               <h4 className="text-xs sm:text-sm font-semibold line-clamp-2">{product.title}</h4>
//               <p className="text-xs text-gray-500">{product.brand}</p>
//               <p className="text-sm text-red-600 font-bold">${product.retailPrice}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductScroller;
