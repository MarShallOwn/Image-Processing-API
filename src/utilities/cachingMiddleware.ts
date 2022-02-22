import express from 'express';
import fs from 'fs';
import path from 'path';
import { requestQuery } from './interfaces';

const projectPath = path.resolve('./');

/** caching middleware that searches for the image with the same width and height in the storage
 * if a image was found then it will be returned in the response and the request won't proceed
 * but if the image was not found then the request will be proceed
 */
const cachingMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { imageName, height, width }: requestQuery = req.query;

  if (!imageName || !height || !width)
    return res
      .status(400)
      .send('should provide (imageName, height and width) in the url query');

  const processedDirName = `${projectPath}/assets/thumb`;
  const reqFileName = `${imageName}${width}${height}`;
  fs.readdir(processedDirName, (err, files) => {
    for (const file of files) {
      if (`${reqFileName}.jpg` === file)
        return res.status(200).sendFile(`${processedDirName}/${file}`);
    }
    if (err) return res.status(400).send(err);
    next();
  });
};

export default cachingMiddleware;
