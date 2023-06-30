import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage({ onSaveImage, onCloseModal }) {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const saveImage = () => {
    console.log(img);
    if(!img) return;
    onSaveImage(img);
  }

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Container max-h-[650] mx-auto w-full">
      {img === null ? (
        <>
          <div className="text-lg text-pinkLight">
            Make sure both the number and the face are out.
          </div>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="bg-black mx-auto my-5 rounded-xl"
          />
          <button className="border-[0.5px] border-pinkLight text-pinkLight text-base py-2 px-4 rounded-full hover:bg-pinkLight hover:text-white" onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" className="max-w-[400px] max-h-[400px]" />
          <div className="flex justify-center w-full gap-4">
            <button className="w-20 border-[0.5px] border-pinkLight text-pinkLight text-base py-1 rounded-full hover:bg-pinkLight hover:text-white" onClick={() => saveImage()}>Ok</button>
            <button className="w-20 border-[0.5px] border-pinkLight text-pinkLight text-base py-1 rounded-full hover:bg-pinkLight hover:text-white" onClick={() => setImg(null)}>Retake</button>
            <button className="w-20 border-[0.5px] border-pinkLight text-pinkLight text-base py-1 rounded-full hover:bg-pinkLight hover:text-white" onClick={() => onCloseModal()}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default WebcamImage;