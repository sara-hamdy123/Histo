"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
export default function FixedInfo() {
  const params = useParams();
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [showSlider, setShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [visibleImages, setVisibleImages] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      if (!params.id) return;
      try {
        setLoading(true);
        const req = await fetch(`https://fakestoreapi.com/products/${params.id}`);
        const product = await req.json();
        const reqAll = await fetch("https://fakestoreapi.com/products");
        const allProducts = await reqAll.json();
        const productImages = allProducts.map((item) => item.image);
        setMainImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setImages(productImages);
        updateVisibleImages(productImages, 0);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  const updateVisibleImages = (images, index) => {
    const start = index * 2 +1;
    const newImages = images.slice(start, start + 2);
    setVisibleImages([...newImages, images[index]]);
  };

  const handleRadioChange = (index) => {
    setSelectedRadio(index);
    updateVisibleImages(images, index);
  };
  const openSlider = () => {
    setShowSlider(true);
    setCurrentIndex(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col mx-auto container p-4 md:p-6">
           {/* Header */}
           <div className="flex flex-col md:flex-row justify-between items-center mb-7">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-black">{category}</span>
          <span className="text-gray-500"> Fixed Artifacts</span>
        </h1>
        <button className="bg-[#020032] px-6 py-2 text-white rounded-md md:mt-0 mt-4">
          Book Now
        </button>
      </div>
      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-black">
        {mainImage && <Image src={mainImage} alt="Artifact" fill className="object-fill opacity-50" />}
        <div className="absolute bottom-4 left-4 text-white bg-opacity-60 p-2 rounded">
          <strong className="block">{category}</strong>
          {mainImage && (
            <p className="flex items-center gap-2 text-sm mt-2">
              <MapPinIcon className="w-5 h-5 text-white" />
              {category}, {category}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-2 my-4 justify-center">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-500 cursor-pointer transition-opacity duration-300 ${
              selectedRadio === index ? "opacity-50" : "opacity-100"
            }`}
            onClick={() => handleRadioChange(index)}
          ></div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        {visibleImages.map((src, index) => (
          <div key={index} className="relative w-full h-32 sm:h-40 md:h-48 bg-black overflow-hidden rounded-xl">
            <Image src={src} alt={`Thumbnail ${index + 1}`} fill className="object-fill opacity-90" />
          </div>
        ))}
        <div className="relative w-full h-32 sm:h-40 md:h-48 flex items-center justify-center bg-black rounded-xl cursor-pointer" onClick={openSlider}>
          {images[3] && <Image src={images[3]} alt="More Images" fill className="object-fill opacity-70" />}
          <span className="absolute text-white text-2xl font-bold">+25</span>
        </div>
      </div>
      {showSlider && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button className="absolute top-5 right-5 text-white text-3xl font-bold" onClick={() => setShowSlider(false)}>
            ✖
          </button>
          <div className="relative w-[90%] md:w-[60%] h-[80%] flex items-center justify-center">
            <Image src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} fill className="object-contain" />
            <button className="absolute left-5 text-white text-3xl font-bold bg-gray-700 p-2 rounded-full"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            >
              <NavigateBeforeIcon />
            </button>
            <button className="absolute right-5 text-white text-3xl font-bold bg-gray-700 p-2 rounded-full" 
            onClick={nextSlide}
            disabled={currentIndex === images.length - 1}
            >
              <NavigateNextIcon />
            </button>
          </div>
        </div>
      )}
        {/* Description */}
        <h2 className="my-5 font-bold text-2xl md:text-4xl">Description :</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

      {/* Location & Working Hours */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="p-6  flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MapPinIcon className="h-6 w-6 text-gray-700" /> Location
          </h2>
          <p className="text-gray-600 mt-2">{category}</p>
        </div>

        <div className="p-6  flex-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClockIcon className="h-6 w-6 text-gray-700" /> Working Hours
          </h2>
          <ul className="text-gray-600 mt-2">
            <li>Sat: 2:45 PM - 2:45 PM</li>
            <li>Mon: 2:45 PM - 2:45 PM</li>
            <li>Tue: 2:45 PM - 2:45 PM</li>
            <li className="text-red-500">Fri: Closed</li>
          </ul>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center">Find Location in Google Maps</h2>
        <p className="text-gray-600 text-center mt-2">
          We'd love to hear from you! Please fill out the form below and we'll get in touch with you shortly.
        </p>
        <div className="mt-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.77757552284!2d31.34069645475446!3d30.059462867070028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e21f28cf1d7%3A0x30bcfb14f962d52c!2z2YLYtdixINin2YTYqNin2LHZiNmGINil2YXYqNin2YY!5e0!3m2!1sar!2seg!4v1741350854153!5m2!1sar!2seg"
            allowFullScreen=""
            loading="lazy"
            className="w-full h-96 rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
