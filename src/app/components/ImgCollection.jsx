import Image from "next/image";
export default async function ImgCollection() {
    const req = await fetch("https://fakestoreapi.com/products")
    const products = await req.json();
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.slice(0, 3).map((p) => (
            <div key={p.id} className=" rounded-lg p-4 ">
              <Image
                src={p.image}
                alt={p.title}
                width={300}
                height={300}
                className="cursor-pointer object-contain w-[416px] h-[300px] rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  } 



