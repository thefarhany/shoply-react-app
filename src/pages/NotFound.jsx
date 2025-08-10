import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Ups! Halaman yang Anda cari tidak tersedia atau mungkin sudah
        dipindahkan. Silakan periksa kembali alamat URL atau kembali ke halaman
        utama.
      </p>

      <Link
        to="/"
        className="px-5 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
