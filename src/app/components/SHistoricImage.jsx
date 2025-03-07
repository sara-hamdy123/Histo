import Image from "next/image";
import historicImage from "../../../public/847af33d34918078775960b7616f12cf.png";

const HistoricImage = () => {
  return (
    <div className="relative h-[45vh] bg-black">
      <Image 
        src={historicImage} 
        alt="Historic area image" 
        className="w-full h-full object-cover"
      />
      <div className="absolute flex flex-col items-start top-[40%] left-[14%]">
        <h3 className="text-white tracking-wide text-5xl lg:text-7xl mb-4">
          Historic Trap
        </h3>
        <span className="text-2xl font-light text-gray-200">
          Welcome to Traps For Our Historic
        </span>
      </div>
    </div>
  );
};

export default HistoricImage;
