"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { MapPinIcon } from "@heroicons/react/24/solid"; 
const Sunken = () => {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(8);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // استخراج قائمة الفئات بدون تكرار
  const uniqueCategories = [
    ...new Set(products.map((item) => item.category)),
  ];

  // فلترة المنتجات حسب البحث والفئة المختارة
  useEffect(() => {
    let filtered = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    setFilteredData(filtered);
  }, [search, selectedCategory, products]);

  return (
    <div className="container mx-auto p-6">
      {/* العنوان */}
      <h2 className="text-black/90 text-center font-bold mt-7 mb-4 text-2xl">
        Discover Our Artifacts
      </h2>

      {/* البحث */}
      <div className="relative max-w-md mx-auto">
        <SearchIcon className="absolute left-3 top-4 text-gray-500 hover:text-blue-500" />
        <input
          type="text"
          placeholder="Search for Sunken artifacts"
          className="border px-10 w-full h-[50px] rounded-full border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TuneIcon className="absolute right-3 top-4 text-gray-500 hover:text-blue-500" />
      </div>

      {/* الفئات والعنوان */}
      <div className="flex flex-col lg:flex-row justify-between items-center py-7">
        <div>
          <h1 className="text-3xl lg:text-5xl font-semibold tracking-wide">
            Sunken Artifacts
          </h1>
          <span className="text-xl text-gray-400">Welcome to Artifacts</span>
        </div>
        <div>
          <select
            className="cursor-pointer border py-2 px-4 rounded-md shadow-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto auto-rows-[1fr]">
        {filteredData.slice(0, count).map((item) => (
          <div key={item.id} className="p-4 shadow rounded-lg relative cursor-pointer flex flex-col items-center">
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute inset-0 bg-black/30 hover:bg-black/50 flex flex-col justify-end items-start text-white py-6 px-3 rounded-2xl">
              <h2 className="text-sm sm:text-lg font-bold">{item.title}</h2>
              <h6 className="text-white mt-2 text-xs sm:text-sm">{item.category}</h6>
              <div className="flex justify-between items-center w-full mt-3">
                <Link href={`/sunken/${item.id}`} className="flex items-center">
                  <button className="bg-black/20 text-white text-xs sm:text-sm px-4 py-2 hover:bg-black/60 rounded w-[99.5px] h-[47px]">
                    View
                    <ArrowOutwardIcon className="ml-1 mt-[-5px] text-xs sm:text-base" />
                  </button>
                </Link>
                <MapPinIcon className="w-6 h-6 text-white hover:text-gray-500" />        
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
  )
  }
  export default Sunken;