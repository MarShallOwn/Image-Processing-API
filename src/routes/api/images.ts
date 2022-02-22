import express from 'express';
import path from 'path';
import { requestQuery } from '../../utilities/interfaces';
import cachingMiddleware from '../../utilities/cachingMiddleware';
import processImage from '../../utilities/processImage';

const projectPath = path.resolve('./');

const images = express.Router();

/** /api/images/ endpoint that takes height, width and imageName as query
 *  it searches for the image by file name in the dir and then resize the image
 *  with the provided height and width
 */
images.get(
  '/',
  cachingMiddleware,
  (req: express.Request, res: express.Response) => {
    const { imageName, height, width }: requestQuery = req.query;

    if (
      parseInt(height as unknown as string) <= 0 ||
      parseInt(width as unknown as string) <= 0
    ) {
      return res
        .status(400)
        .send("Height or Width should't be equal or below 0");
    }
    const reqFileName = `${imageName}${width}${height}`;

    const imagePath = `${projectPath}/assets/full/${imageName}.jpg`;
    const processedImagePath = `${projectPath}/assets/thumb/${reqFileName}.jpg`;

    processImage(imagePath, width, height, processedImagePath)
      .then(() => {
        return res.status(200).sendFile(processedImagePath);
      })
      .catch(() => {
        return res.status(400).send('file missing or file name incorrect');
      });
  }
);

export default images;
