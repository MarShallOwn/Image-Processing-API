"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cachingMiddleware_1 = __importDefault(require("../../utilities/cachingMiddleware"));
var processImage_1 = __importDefault(require("../../utilities/processImage"));
var projectPath = path_1.default.resolve('./');
var images = express_1.default.Router();
/** /api/images/ endpoint that takes height, width and imageName as query
 *  it searches for the image by file name in the dir and then resize the image
 *  with the provided height and width
 */
images.get('/', cachingMiddleware_1.default, function (req, res) {
    var _a = req.query, imageName = _a.imageName, height = _a.height, width = _a.width;
    if (parseInt(height) <= 0 ||
        parseInt(width) <= 0) {
        return res
            .status(400)
            .send("Height or Width should't be equal or below 0");
    }
    var reqFileName = "".concat(imageName).concat(width).concat(height);
    var imagePath = "".concat(projectPath, "/assets/full/").concat(imageName, ".jpg");
    var processedImagePath = "".concat(projectPath, "/assets/thumb/").concat(reqFileName, ".jpg");
    (0, processImage_1.default)(imagePath, width, height, processedImagePath)
        .then(function () {
        return res.status(200).sendFile(processedImagePath);
    })
        .catch(function () {
        return res.status(400).send('file missing or file name incorrect');
    });
});
exports.default = images;
