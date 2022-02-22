import sharp from 'sharp';

/** handles the processing of the image and storing it */
const processImage = (
  imagePath: string,
  width: number | undefined,
  height: number | undefined,
  processedImagePath: string
) => {
  return new Promise((resolve, reject) => {
    sharp(imagePath)
      .resize(
        parseInt(width as unknown as string),
        parseInt(height as unknown as string)
      )
      .toFile(processedImagePath)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default processImage;
