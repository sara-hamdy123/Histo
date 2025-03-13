"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function EventPage() {
  const [products, setProducts] = useState([]);
  const [mainProduct, setMainProduct] = useState(null);
  const router = useRouter();
  const { id } = useParams(); // للحصول على الـ ID من الرابط

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const selectedProduct = data.find((product) => product.id === parseInt(id));
        setMainProduct(selectedProduct);
      });
  }, [id]); // يعيد جلب البيانات عند تغيير الـ id

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {mainProduct && (
        <div className="bg-white p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{mainProduct.title}</h1>
            <p className="flex items-center text-gray-600 my-2">
              <MapPinIcon className="w-5 h-5 mr-2" /> Location, Location, Location
            </p>
            <p className="flex items-center text-gray-600 my-2">
              <MapPinIcon className="w-5 h-5 mr-2" /> Date
            </p>
            {[...Array(4)].map((_, index) => (
              <p key={index} className="text-gray-700 mb-4">{mainProduct.description}</p>
            ))}
            <button className="bg-[#020032] text-white px-4 py-2 rounded-md mt-2">
              Book Now
            </button>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-2">
            {[...Array(4)].map((_, index) => (
              <Image
                key={index}
                src={mainProduct.image}
                alt={mainProduct.title}
                width={400}
                height={index === 1 || index === 2 ? 150 : 250}
                className={`w-full h-40 object-fill rounded-lg ${index === 1 || index === 2 ? 'h-24' : 'h-40'}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Events */}
      <h2 className="text-xl font-semibold mt-6">Other Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {products
          .filter((product) => product.id !== parseInt(id)) // استبعاد المنتج الرئيسي من قائمة المنتجات الأخرى
          .slice(0, 6) // اختيار ٦ منتجات فقط
          .map((product) => (
            <div key={product.id} className="bg-white p-4 flex flex-col h-full ">
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={507}
                  height={314}
                  className={`w-full h-48 object-fill rounded-lg `}
                />
                <span className="absolute top-2 right-2 bg-red-600 text-white px-4 py-4  text-sm rounded-md">
                  ${product.price}
                </span>
            </div>
            <h3 className="text-lg font-bold mt-2">{product.title}</h3>
            <p className="text-gray-700 line-clamp-2 mb-4">{product.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <p className="text-gray-600 text-sm flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2" /> Location, Location, Location
              </p>
              <button
                onClick={() => router.push(`/events/${product.id}`)}
                className="hover:text-white hover:bg-[#020032] border border-[#020032] text-[#020032] hover:opacity-80 px-4 py-2 rounded-md"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}