import supertest from 'supertest';
import app from '../../../server';
import path from 'path';
import fs from 'fs';

const projectPath = path.resolve('./');

const request = supertest(app);

describe('Test /api/images endpoint', () => {
  let filename = 'fjord';
  let height = 20;
  let width = 20;

  // remove the stored file from test if it was found after each test
  afterEach(() => {
    const reqFileName = `${filename}${width}${height}`;

    fs.access(`${projectPath}/assets/thumb/${reqFileName}.jpg`, (err) => {
      if (err) return;
      fs.unlinkSync(`${projectPath}/assets/thumb/${reqFileName}.jpg`);
    });
  });

  it('should reject when writing wrong file name', async () => {
    filename = 'good';

    const result = await request.get(
      `/api/images?imageName=${filename}&width=400&height=400`
    );

    expect(result.status).toBe(400);
  });

  it('should reject when one , two or three query attributes are missing', async () => {
    filename = 'fjord';

    const result = await request.get(`/api/images?imageName=${filename}`);

    expect(result.status).toBe(400);
  });

  it('should reject when adding width or height of number lower or equal to 0', async () => {
    filename = 'fjord';
    height = 0;
    width = -20;

    const result = await request.get(
      `/api/images?imageName=${filename}&width=${width}&height=${height}`
    );

    expect(result.status).toBe(400);
  });

  it('should accept when searching for right image and right size', async () => {
    height = 50;
    width = 50;

    const result = await request.get(
      `/api/images?imageName=${filename}&width=${width}&height=${height}`
    );

    expect(result.status).toBe(200);
  });
});
