# Image Processing API

Image Processing API is used for resize and store of image when user visit the url.

## What is included in this project
* **`Express:`** provide server-side logic for web and mobile applications.
* **`Jasmine:`** For Unit-Testing the Functions and End-Points.
* **`Typescript:`** which primarily provides optional static.typing, classes and interfaces and richer environment for spotting common errors as you type.
* **`Caching:`** so that repeated requests use pre-stored images rather than regenerating a new image.
* **`Used File System (fs):`** to create or delete files that are stored in the project.
* **`Eslint:`** for identifying problematic patterns found in the project code.
* **`Prettier:`** automatically makes your code more readable and consistent with your project's style guide. 
* **`Sharp Module:`** it is a Node.js Module for image processing.


## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation
* `git clone https://github.com/MarShallOwn/Image-Processing-API.git`
* `enter the folder`
* `open terminal`
* `write down "npm install" to download all the dependancies that the project needs`
* `open the project on whatever IDE you prefer`

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the **production mode.**<br>
Open [http://localhost:8000](http://localhost:3000) to view it in the browser.

## `npm run dev`
Runs the app in the **development mode.**<br>
Open [http://localhost:8000](http://localhost:3000) to view it in the browser.

### `npm run test`

Runs the Unit-Test using Jasmine.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It compiles TypeScript to JavaScript.

### `npm run lint`

To run lint on the Project

### `npm run prettier`

To run prettier on the Project

**Note: `test, start and dev` scripts all run the `lint, prettier and build` scripts before they execute.**

## Endpoints

In is project there is currently only one endpoint which is :

* ### **`/api/images?imageName=fjord&width=400&height=500`** METHOD GET
