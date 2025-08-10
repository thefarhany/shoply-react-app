import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import { FaTrashCan } from "react-icons/fa6";

export default function Navbar() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tutup dropdown jika klik di luar area cart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-10 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-blue-300 transition"
        >
          Shoply
        </Link>

        <div className="flex gap-6 items-center">
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `font-semibold hover:text-blue-300 transition ${
                isActive ? "text-blue-300" : ""
              }`
            }
          >
            My Transactions
          </NavLink>

          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setCartOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition relative"
            >
              <FaShoppingCart />
              Cart
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 absolute -top-2 -right-2">
                  {totalItems}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <div className="p-3 max-h-64 overflow-y-auto">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 mb-3 border-b pb-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} x{" "}
                            {item.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 transition"
                          title="Hapus item"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center">
                      Keranjang kosong
                    </p>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="p-3 text-center flex gap-3">
                    <button
                      onClick={() => clearCart()}
                      className="px-4 p-2 bg-red-400 text-white rounded"
                    >
                      <FaTrashCan />
                    </button>
                    <NavLink
                      to="/checkout"
                      className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 block transition"
                    >
                      Lihat Keranjang
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
