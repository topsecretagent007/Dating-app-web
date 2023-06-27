import React, { useRef, useState } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import demoImage from "../assets/findImage.png";



function centerAspectCrop(
    mediaWidth,
    mediaHeight,
    aspect
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

function ImageCropper(props) {
    const { imageToCrop, onImageCropped, onImageCroppedUrl } = props;
    const [crop, setCrop] = useState("")
    const imageRef = useRef("");

    const onImageLoad = (e) => {
        const { width, height } = e.target;
        setCrop(centerAspectCrop(width, height, 1))
    }

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef.current,
                crop,
                'croppedImage.jpeg' // destination filename
            );

            // calling the props function to expose
            // croppedImage to the parent component
            ///onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
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
            //const reader = new FileReader();
            canvas.toBlob(
                (blob) => {
                    // returning an error
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }
                    const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
                    blob.name = fileName;
                    // creating a Object URL representing the Blob object given
                    const croppedImageUrl = window.URL.createObjectURL(blob);
                    onImageCropped({ file: file, url: croppedImageUrl });
                    resolve(croppedImageUrl);
                }, 'image/jpeg'
            );
        });
    }

    return (
        <ReactCrop
            crop={crop}
            // onImageLoaded={(imageRef) => setImageRef(imageRef)}
            onComplete={(crop) => cropImage(crop)}
            onChange={(crop) => setCrop(crop)}
            crossorigin="anonymous"
            aspect={1}
        >
                <img ref={imageRef} src={imageToCrop || demoImage} onLoad={onImageLoad} />
        </ReactCrop>
    );
}

ImageCropper.defaultProps = {
    onImageCropped: () => { console.log("AAAAAAAAAAAAAAAAA") }
}

export default ImageCropper;