"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import Image from "next/image";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function ProductSlider({ category }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                let url = "https://fakestoreapi.com/products";
                if (category) {
                    url += `/category/${category}`;
                }
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        }
        fetchProducts();
    }, [category]);

    if (loading) return <p>Loading...</p>;

    const paginatedProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    return (
        <div className="container mx-auto px-4 ">
            <Swiper
                modules={[Navigation, Grid]}
                navigation
                spaceBetween={2} // ✅ مسافات صغيرة جدًا بين الصور
                slidesPerView={1}
                grid={{ rows: 2, fill: "row" }}
                loop={false}
                breakpoints={{
                    300: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                }}
                className="mt-6 "
            >
                {paginatedProducts.map((product, index) => (
                    <SwiperSlide key={product.id}>
                        <div
                            className={`relative 
                                ${index === 4 ? "mt-[-7rem]" : ""} 
                            }`} // ✅ إزالة المسافة بين الفهارس المحددة
                        >
                            <Image
                                src={product.image}
                                alt=""
                                className={`cursor-pointer rounded-2xl object-fill mt-6  ${
                                    product.id % 2 == 1 ? "h-[450px] " : "h-[350px] "
                                }`}
                                width={350}
                                height={250}
                                onClick={() => {
                                    setIsOpen(true);
                                    setCurrentIndex(products.indexOf(product));
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative flex items-center">
                        <button
                            className="absolute left-4 p-3 rounded-full bg-white text-black hover:bg-gray-300"
                            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentIndex === 0}
                        >
                            <NavigateBeforeIcon />
                        </button>
                        <Image
                            src={products[currentIndex].image}
                            alt="selected img"
                            width={500}
                            height={400}
                            className="rounded-lg object-contain w-[500px] h-[400px]"
                        />
                        <button
                            className="absolute right-4 p-3 rounded-full bg-white text-black hover:bg-gray-300"
                            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, products.length - 1))}
                            disabled={currentIndex === products.length - 1}
                        >
                            <NavigateNextIcon />
                        </button>
                    </div>
                    <button
                        className="absolute top-4 right-4 bg-red-500 py-2 px-4 rounded-full text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        ✖
                    </button>
                </div>
            )}

            <div className="relative flex items-center justify-center text-center mt-6">
                <button
                    className="p-3 rounded-full bg-white text-black hover:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                >
                    <NavigateBeforeIcon />
                </button>
                <button
                    className="ml-4 p-3 rounded-full bg-white text-black hover:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                    disabled={(currentPage + 1) * itemsPerPage >= products.length}
                    onClick={() => setCurrentPage((prev) => (prev + 1) * itemsPerPage < products.length ? prev + 1 : prev)}
                >
                    <NavigateNextIcon />
                </button>
            </div>
        </div>
    );
}
