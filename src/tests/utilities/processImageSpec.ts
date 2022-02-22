import processImage from '../../utilities/processImage';
import path from 'path';
import fs from 'fs';

const projectPath = path.resolve('./');

describe('Test process Image Function', () => {
  let imageName: string, height: number, width: number;

  // remove the stored file from test if it was found after each test
  afterEach(() => {
    const reqFileName = `${imageName}${width}${height}`;

    fs.access(`${projectPath}/assets/thumb/${reqFileName}.jpg`, (err) => {
      if (err) return;
      fs.unlinkSync(`${projectPath}/assets/thumb/${reqFileName}.jpg`);
    });
  });

  it('should resolve process image and store it on correct inputs', async () => {
    imageName = 'fjord';
    height = 123;
    width = 123;

    const reqFileName = `${imageName}${width}${height}`;
    const imagePath = `${projectPath}/assets/full/${imageName}.jpg`;
    const processedImagePath = `${projectPath}/assets/thumb/${reqFileName}.jpg`;

    await expectAsync(
      processImage(imagePath, width, height, processedImagePath)
    ).toBeResolved();
  });

  it('should reject process image and dont store it on incorrect inputs', async () => {
    imageName = 'dummy';
    height = 324;
    width = 324;

    const reqFileName = `${imageName}${width}${height}`;
    const imagePath = `${projectPath}/assets/full/${imageName}.jpg`;
    const processedImagePath = `${projectPath}/assets/thumb/${reqFileName}.jpg`;

    await expectAsync(
      processImage(imagePath, width, height, processedImagePath)
    ).toBeRejected();
  });
});
