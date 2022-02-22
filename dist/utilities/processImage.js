"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
/** handles the processing of the image and storing it */
var processImage = function (imagePath, width, height, processedImagePath) {
    return new Promise(function (resolve, reject) {
        (0, sharp_1.default)(imagePath)
            .resize(parseInt(width), parseInt(height))
            .toFile(processedImagePath)
            .then(function (data) {
            resolve(data);
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
exports.default = processImage;
