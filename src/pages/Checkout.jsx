import React from "react";
import { useCartStore } from "../store/cartStore";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { cart, clearCart, setCheckoutInfo } = useCartStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const transaction = {
      ...data,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString,
    };

    setCheckoutInfo(transaction);

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, transaction])
    );

    clearCart();
    reset();
    alert("Order Placed Successfull!!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Keranjang kosong</p>
      ) : (
        <>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Produk</th>
                <th className="p-2 text-center">Jumlah</th>
                <th className="p-2 text-right">Harga</th>
                <th className="p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-t border-gray-300">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-right">
                    Rp {item.price.toLocaleString()}
                  </td>
                  <td className="p-2 text-right">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 font-bold">
              <tr>
                <td colSpan="3" className="p-2 text-right">
                  Total
                </td>
                <td className="p-2 text-right">
                  Rp{" "}
                  {cart
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
            <h1 className="text-2xl font-bold">Checkout Form</h1>
            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <input
                type="text"
                {...register("name", { required: "Nama wajib diisi" })}
                className="w-full p-2 border rounded"
                placeholder="Nama Lengkap"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Alamat</label>
              <textarea
                {...register("address", { required: "Alamat wajib diisi" })}
                className="w-full p-2 border rounded"
                placeholder="Alamat Pengantaran"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Format email tidak valid",
                  },
                })}
                placeholder="Alamat Email"
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Metode Pembayaran
              </label>
              <select
                {...register("paymentMethod", {
                  required: "Metode pembayaran wajib dipilih",
                })}
                className="w-full p-2 border rounded"
              >
                <option value="">-- Pilih --</option>
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Cash on Delivery</option>
                <option value="ewallet">E-Wallet</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Tombol */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
