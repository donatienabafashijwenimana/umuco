import React, { useState, useEffect, useRef } from "react";

function Dashboard() {
  const images = [
    "pic1.jpg",
    "pic2.jpg",
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "pic4.png",
    "pic5.png",
  ];

  // duplicate first 3 images at the end for seamless loop
  const extendedImages = [...images, ...images.slice(0, 3)];

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (index >= images.length) {
      // temporarily remove transition
      containerRef.current.style.transition = "none";
      setIndex(0);
      // force reflow so transition works next time
      containerRef.current.offsetHeight; 
      containerRef.current.style.transition = "transform 2s ease-in-out";
    }
  };

  return (
    <div className="w-full flex flex-col max-h-[450px] overflow-auto">
       <div className="relative w-full h-[500px] min-h-[500px] overflow-hidden bg-gray-100 flex  items-center">
            <div
                ref={containerRef}
                className="flex transition-transform duration-[2000ms] ease-in-out"
                style={{
                transform: `translateX(-${index * (100 / 3)}%)`,
                width: `${(extendedImages.length * 100) / 3}%`,
                }}
                onTransitionEnd={handleTransitionEnd}
            >
                {extendedImages.map((img, i) => (
                <div key={i} className="w-1/3 flex-shrink-0 px-2">
                    <img
                    src={img}
                    alt={`slide-${i}`}
                    className="h-[495px] w-full object-cover rounded-lg shadow-lg"
                    />
                </div>
                ))}
            </div>
        </div>
        <p className="w-full text-lg p-3">
            ibikorwa byacu
      </p>
    </div>
  );
}

export default Dashboard;
