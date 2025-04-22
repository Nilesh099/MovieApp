import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < bannerData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentIndex(0);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL, currentIndex]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData?.map((data, index) => {
          return (
            <div
              key={data.id + "bannerHome" + index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hideen relative group transition-all duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <div className="w-full h-full">
                <img
                  src={imageURL + data.backdrop_path}
                  alt="banner"
                  className="h-full w-full objct-cover"
                />
              </div>

              {/***button Prev Next */}
              <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
                <button
                  onClick={handlePrevious}
                  className="bg-white p-1 rounded-full text-2xl z-10 text-black"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-1 rounded-full text-2xl z-10 text-black"
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto">
                <div className=" w-full absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data?.title || data?.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>

                  <div className="flex items-center gap-4">
                    <p>Rating:{Number(data.vote_average).toFixed(1)}+</p>
                    <span> | </span>
                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <Link
                    to={"/" + data?.media_type + "/" + data.id}
                    className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default BannerHome;
