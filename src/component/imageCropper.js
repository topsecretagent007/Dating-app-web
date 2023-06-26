import React, {useState} from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import demoImage from "../assets/findImage.png";

function ImageCropper(props) {
    const {imageToCrop, onImageCropped} = props;

    const [cropConfig, setCropConfig] = useState(
        // default crop config
        {
            unit: '%',
            width: 30,
            height: 30,
            aspect: 9 / 9,
        }
    );

    const [imageRef, setImageRef] = useState("");

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef,
                crop,
                'croppedImage.jpeg' // destination filename
            );

            // calling the props function to expose
            // croppedImage to the parent component
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        console.log("FFFFFFFFFFF")
        // creating the cropped image from the source image
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    // returning an error
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }

                    blob.name = fileName;
                    // creating a Object URL representing the Blob object given
                    const croppedImageUrl = window.URL.createObjectURL(blob);

                    resolve(croppedImageUrl);
                }, 'image/jpeg'
            );
        });
    }

    return (
        <>
             <ReactCrop
                crop={cropConfig}
                onImageLoaded={(imageRef) => console.log(imageRef)}
                onComplete={(cropConfig) => cropImage(cropConfig)}
                onChange={(cropConfig) => setCropConfig(cropConfig)}
                crossorigin="anonymous"
                square={true}
            >
                <img src={imageToCrop || demoImage} />
            </ReactCrop>
        </>
       
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => {console.log("AAAAAAAAAAAAAAAAA")}
}

export default ImageCropper;