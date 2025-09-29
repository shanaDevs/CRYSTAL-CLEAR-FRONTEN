import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images || [];
  const [activeImage, setActiveImage] = useState(images[0]);
  return (
    <div className="w-full h-full bg-gray-200 flex justify-center items-center relative">
      <div className="w-[80%] h-full relative">
        <img
          src={activeImage}
          alt="Product Image"
          className="w-full h-full object-contain"
        />
        <div className="h-[100px] w-full absolute bottom-0 left-0 flex justify-center items-center backdrop-blur-md">
          {images.map((img, index) => {
            return (
              <img
                key={index}
                src={img}
                alt={"Product Image " + (index + 1)}
                className="h-full aspect-square mx-[5px]"
                onClick={() => setActiveImage(img)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
