import Image from "next/image";
import ImgRelated from "@/app/components/ImgRelated";
import ImgCollection from "@/app/components/ImgCollection";

export default async function ProductInfo({ params }) {
  const { id } = await params;
  const req = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await req.json();

  return (
    <div className="min-h-screen">
      {/* Image and Title */}
      <div className="relative w-full h-[60vh] text-white flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="w-full h-full"
        />
        <h1 className="absolute top-[20%] left-[5%] text-[5vw] sm:text-[4vw] md:text-[64px] font-bold">
          {product.title}
        </h1>
      </div>

      {/* Product Details */}
      <div className="mx-auto shadow-lg flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-10 bg-gradient-to-r from-[#f0e68c] via-[#f5f5f5] to-[#AA8E5C]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold w-full md:w-[360px] text-center md:text-left mb-4 sm:mb-6 md:mb-0">
          Discover the {product.title}
        </h2>
        <p className="text-lg sm:text-xl w-full md:w-[870px] text-center md:text-left">
          {product.description}
        </p>
      </div>

      {/* Art and Artifacts Section */}
      <div className="flex flex-col p-6 sm:p-10 md:p-20">
        <h1 className="font-medium text-lg sm:text-xl">
          Art and Artifacts of {product.title} Egypt
        </h1>
        <h6 className="mt-2 text-gray-500 text-xs sm:text-sm">
          Explore the artistic expressions of ancient Egyptians.
        </h6>
      </div>
      <ImgCollection />

      {/* Exploring the Lifestyle Section */}
      <div className="flex flex-col lg:flex-row container mx-auto mt-16 sm:mt-24 md:mt-32 justify-between px-4 sm:px-6 md:px-0">
        <div className="flex flex-col w-full lg:w-[550px]">
          <h2 className="font-bold text-2xl sm:text-3xl">
            Exploring the Lifestyle of the {product.title}
          </h2>
          <p className="py-4 sm:py-5 leading-6">{product.description}</p>
        </div>
        <ImgRelated />
      </div>

      <p className="container mx-auto mt-20 sm:mt-28 leading-7 px-4 sm:px-6 md:px-0">
        {product.description}
      </p>
    </div>
  );
}
