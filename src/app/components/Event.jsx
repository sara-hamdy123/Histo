"use client";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      if (filter === "low") return product.price < 50;
      if (filter === "high") return product.price >= 50;
      return true;
    });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* شريط البحث والفلاتر */}
      <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-16 gap-4 ">
        <div className="relative w-full mx-auto md:w-[400px]">
          <SearchIcon className="absolute left-4 top-4 text-gray-500 hover:text-[#020032]" />
          <input
            type="text"
            placeholder="Search For Products"
            className="pl-12 pr-4 border border-[#020032] rounded-lg h-[50px] w-full text-lg focus:outline-none focus:border-[#020032]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { type: "all", label: "All" },
            { type: "low", label: "أقل من 50$" },
            { type: "high", label: "أكثر من 50$" },
          ].map(({ type, label }) => (
            <button
              key={type}
              className={`px-4 py-2 whitespace-nowrap rounded-lg text-lg ${
                filter === type
                  ? "bg-[#020032] text-white"
                  : "text-[#020032] border border-[#020032]"
              }`}
              onClick={() => setFilter(type)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {filteredProducts.slice(0, visibleCount).map((product, index) => (
          <div
            key={product.id}
            className="p-4 relative flex flex-col md:flex-row justify-between border border-b-2"
          >
            <span className="absolute top-[-3.5rem] right-[-1rem] bg-red-600 text-white px-2 py-4 rounded-sm text-sm">
              ${product.price}
            </span>

            <div className="flex flex-col max-w-xl ">
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <p className="text-gray-500 text-sm mb-2">{product.category}</p>
              <p className="flex items-center gap-2 text-sm mt-2 text-gray-600">
                <MapPinIcon className="w-5 h-5" />
                {product.category}, {product.category}, {product.category}
              </p>
              <span className="font-bold mt-3">${product.price}</span>
              <Link href={`/events/${product.id}`} className="flex items-center">
                <button className="bg-[#020032] mt-3 md:mb-11 text-white text-lg px-6 py-3 hover:bg-[#020032]/90 rounded-lg">
                  View
                  <ArrowRightAltIcon className="ml-3 mt-[-5px]" />
                </button>
              </Link>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-5xl` }>
              {index % 2 === 0 ? (
                <>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-fill rounded-xl"
                  />
                  <div className="flex flex-col gap-2 h-full w-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-32 object-cover rounded-tr-3xl"
                    />
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-32 object-cover rounded-br-3xl"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2 max-w-4xl">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-32 object-cover rounded-tl-3xl"
                    />
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-32 object-cover rounded-bl-3xl"
                    />
                  </div>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-fill rounded-xl"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount(visibleCount + 5)}
            className="bg-[#020032] text-white text-lg p-[10px] w-full sm:w-80 h-[50px] sm:h-12 hover:bg-[#020032]/90 rounded"
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
}