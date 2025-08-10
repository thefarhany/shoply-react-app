import React from "react";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 mb-2">
          {product.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
        >
          <FaCartPlus /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
