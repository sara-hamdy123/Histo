import Image from "next/image";
import fixed from "../../../public/71dfd82ac4a1510217100d133715960b.png";

const FixedImg = () => {
  return (
    <div className="relative h-[50vh] bg-black">
      {/* صورة الخلفية */}
      <Image 
        src={fixed} 
        alt="historic area image" 
        className="w-full h-full object-cover"
      />

      {/* النص فوق الصورة */}
      <div className="absolute top-[40%] left-[14%] flex flex-col items-start max-w-screen-lg px-4">
        <h3 className="text-white tracking-wide text-4xl md:text-5xl lg:text-6xl mb-4">
          Our Artifacts
        </h3>
        <span className="text-gray-200 text-lg md:text-2xl font-light">
          Welcome to Our artifacts
        </span>
      </div>
    </div>
  );
};

export default FixedImg;
