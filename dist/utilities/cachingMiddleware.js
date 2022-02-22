"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var projectPath = path_1.default.resolve('./');
/** caching middleware that searches for the image with the same width and height in the storage
 * if a image was found then it will be returned in the response and the request won't proceed
 * but if the image was not found then the request will be proceed
 */
var cachingMiddleware = function (req, res, next) {
    var _a = req.query, imageName = _a.imageName, height = _a.height, width = _a.width;
    if (!imageName || !height || !width)
        return res
            .status(400)
            .send('should provide (imageName, height and width) in the url query');
    var processedDirName = "".concat(projectPath, "/assets/thumb");
    var reqFileName = "".concat(imageName).concat(width).concat(height);
    fs_1.default.readdir(processedDirName, function (err, files) {
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            if ("".concat(reqFileName, ".jpg") === file)
                return res.status(200).sendFile("".concat(processedDirName, "/").concat(file));
        }
        if (err)
            return res.status(400).send(err);
        next();
    });
};
exports.default = cachingMiddleware;
