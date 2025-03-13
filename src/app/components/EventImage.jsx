import Image from "next/image";
import fixed from "../../../public/71dfd82ac4a1510217100d133715960b.png";

const EventImage = () => {
  return (
    <div className="relative h-[50vh] bg-black">
      {/* صورة الخلفية */}
      <Image 
        src={fixed} 
        alt="historic area image" 
        className="w-full h-full object-fill filter blur-sm brightness-50 contrast-100"
      />

      {/* النص فوق الصورة */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <h3 className="text-white tracking-widest text-xl md:text-2xl lg:text-4xl  drop-shadow-lg">
          Explore the Magic of Egyptian <br /> Heritage!
        </h3>
      </div>
    </div>
  );
};

export default EventImage;