import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("orders")) || [];
    setTransactions(savedTransactions);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Transactions</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Produk Dibeli</th>
              <th className="border px-4 py-2">Metode Pembayaran</th>
              <th className="border px-4 py-2">Total Harga</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2 capitalize text-center">
                  {trx.name}
                </td>
                <td className="border px-4 py-2">
                  <ul className="list-disc list-inside">
                    {trx.items.map((item, i) => (
                      <li key={i}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2 capitalize text-center">
                  {trx.paymentMethod}
                </td>
                <td className="border px-4 py-2 capitalize text-center font-bold">
                  Rp {trx.total.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;
