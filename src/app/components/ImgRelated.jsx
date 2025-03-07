import Image from "next/image";
export default async function ImgRelated() {
    const req = await fetch("https://fakestoreapi.com/products")
    const products = await req.json();
    return (
      <div className="">
        <div className="">
          {products.slice(0,1).map((p) => (
            <div key={p.id} className=" rounded-lg p-4  ">
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={300}
                className="cursor-pointer object-contain w-[573px] h-[570px] rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  } 



