import React, { useState } from "react";
import FindImage from "../../assets/findImage.png"

export default function Carousel() {

  const images = [FindImage, FindImage, FindImage];


  const [currentImage, setCurrentImage] = React.useState(0);

  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  const arrowStyle =
    'absolute text-white text-2xl z-10 bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center';

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? '-mt-10' : 'mt-10'} right-2`}
      style={{ top: '40%' }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        {isLeft ? '˄' : '˅'}
      </span>
    </button>
  );

  return (
    <div className="flex justify-center w-screenw-full items-center">
      <div className="relative w-full">
        <div className="carousel">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div className="w-full h-full flex-shrink-0" key={img} ref={refs[i]}>
              <img src={img} className="h-full object-contain" />
            </div>
          ))}
          {sliderControl()}
        </div>
      </div>
    </div>
  );
}