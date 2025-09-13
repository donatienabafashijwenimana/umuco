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

  // extend images for seamless loop
  const extendedImages = [...images, ...images.slice(0, 3)];
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (index >= images.length) {
      containerRef.current.style.transition = "none";
      setIndex(0);
      void containerRef.current.offsetHeight; // reflow
      containerRef.current.style.transition = "transform 2s ease-in-out";
    }
  };

  return (
    <div className="w-[98%] shadow-xl flex flex-col h-full overflow-y-auto m-3 rounded-2xl bg-gradient-to-br from-purple-50 to-green-50">
      <h2 className="text-2xl md:text-2xl font-bold text-center text-purple-700 mb-4">
          Murakaza Neza ku Rubuga <span className="text-green-600">UmUco Wacu</span>
        </h2>
      <div className="relative w-full h-auto min-h-[400px] overflow-hidden bg-gray-100 flex items-center rounded-t-2xl">
        <div
          ref={containerRef}
          className="flex transition-transform duration-[2000ms] ease-in-out w-full"
          style={{
            transform: `translateX(-${index * (100 / 3)}%)`,
            width: `${(extendedImages.length * 100) / 3}%`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedImages.map((img, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
            >
              <img
                src={img}
                alt={`slide-${i}`}
                className="h-[380px] md:h-[450px] lg:h-[500px] w-full object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="p-6 md:p-10 bg-white/80 backdrop-blur-md rounded-b-2xl">
        <h2 className="text-2xl md:text-2xl font-bold text-center text-purple-700 mb-4">
          Murakaza Neza ku Rubuga <span className="text-green-600">UmUco Wacu</span>
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
          Uru rubuga rugamije gusigasira no kumenyekanisha umuco nyarwanda.
          Ni nk’isomero ry’ikoranabuhanga ry’Ikinyarwanda rigenewe abana,
          urubyiruko n’abakuru bose. Rugamije gufasha abanyeshuri, abarimu,
          ababyeyi ndetse n’abashakashatsi mu kongera ubumenyi ku rurimi n’umuco
          nyarwanda. Aha uzasanga ibisakuzo, imigani migufi n’imigani miremire,
          ikeshamvugo n’amateka y’u Rwanda kuva kera kugeza ubu. Ibi byose
          bigamije kurinda no guteza imbere indangagaciro z’abanyarwanda
          zirimo ubupfura, ubumwe, ubutwari n’ubwenge. Twese hamwe tugomba
          gukunda umuco wacu, tukawusigasira kandi tukawuteza imbere kuko ari
          wo soko y’ubumwe, amahoro n’iterambere ry’igihugu.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
