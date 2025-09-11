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
    }, 4000); // every 4 sec

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (index >= images.length) {
      // remove transition
      containerRef.current.style.transition = "none";
      setIndex(0);

      // force reflow so transition works next time
      void containerRef.current.offsetHeight;
      containerRef.current.style.transition = "transform 2s ease-in-out";
    }
  };

  return (
    <div className="w-[98%] shadow-xl flex flex-col h-full overflow-y-auto thin scrollbar-thin-blue-500 m-3">
      {/* Carousel */}
      <div className="relative w-full h-outo min-h-[500px] overflow-hidden bg-gray-100 flex items-center">
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
                className="h-[495px] w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="w-full text-base md:text-lg lg:text-xl p-5 leading-relaxed">
        Murakaza neza ku rubuga <strong>UmUco Wacu</strong>, urubuga rugamije
        gusigasira no kumenyekanisha umuco nyarwanda. Uru rubuga ni
        nk’isomero ry’ikoranabuhanga ry’Ikinyarwanda rigenewe abana, urubyiruko
        n’abakuru bose, rukaba rugamije gufasha abanyeshuri, abarimu, ababyeyi
        ndetse n’abashakashatsi mu kongera ubumenyi ku rurimi n’umuco nyarwanda.
        Aha uzasanga ibisakuzo byatozaga ubwenge, imigani migufi n’imigani
        miremire y’inyigisho, ikeshamvugo ryigisha ubuhanga mu magambo ndetse
        n’amateka y’u Rwanda kuva kera kugeza ubu. Ibi byose bigamije kurinda
        no guteza imbere indangagaciro z’abanyarwanda zirimo ubupfura, ubumwe,
        ubutwari n’ubwenge. Twese hamwe tugomba gukunda umuco wacu, tukawusigasira
        kandi tukawuteza imbere kuko ari wo soko y’ubumwe, amahoro n’iterambere
        ry’igihugu.
      </p>
    </div>
  );
}

export default Dashboard;
