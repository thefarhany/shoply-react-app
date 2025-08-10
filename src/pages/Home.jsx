import React, { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";

const Home = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Sports",
    "Food & Beverage",
    "Home & Living",
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="px-6 py-8">
      <section className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg px-10 py-16 mb-10">
        <h1 className="text-4xl font-bold mb-4">Selamat Datang di Shoply</h1>
        <p className="text-lg">
          Temukan produk terbaik untuk kebutuhan Anda. Belanja mudah, cepat, dan
          aman.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded border transition ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Produk tidak ditemukan.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
