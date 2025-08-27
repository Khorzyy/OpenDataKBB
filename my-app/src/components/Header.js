import React from "react";
import { FaHome, FaGlobe } from "react-icons/fa";
import buildingImg from "../assets/logo-kbb.jpeg";

export default function Header() {
  return (
    <header className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white rounded-xl shadow-lg overflow-hidden">
      
      {/* Shape dekoratif */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -translate-x-16 translate-y-16"></div>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Kiri - Teks */}
        <div className="max-w-lg md:w-1/2">
          <p className="text-sm text-blue-100 mb-2 tracking-wide uppercase">
            Kabupaten Bandung Barat
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-snug drop-shadow">
            Innovative Solutions For <br /> Modern Businesses
          </h1>
          <p className="text-blue-100 mt-4 text-sm leading-relaxed">
            Our innovative solutions are designed to help modern businesses thrive in an ever-changing marketplace.
          </p>
          <button className="mt-6 px-6 py-2 bg-white text-blue-700 rounded-full font-semibold shadow hover:bg-blue-100 transition-all hover:shadow-lg">
            Learn More
          </button>
          
          {/* Info Website & Alamat */}
          <div className="flex flex-wrap items-center gap-5 text-xs mt-6 text-blue-100">
            <div className="flex items-center gap-2">
              <FaGlobe /> www.reallygreatsite.com
            </div>
            <div className="flex items-center gap-2">
              <FaHome /> 123 Anywhere st, Any City
            </div>
          </div>
        </div>

        {/* Kanan - Gambar Lingkaran */}
        <div className="relative md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-105 transition-transform">
            <img
              src={buildingImg}
              alt="Building"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
