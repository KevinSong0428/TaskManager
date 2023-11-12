<a name="readme-top"></a>
# TaskManager

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a>
      <ul>
        <li><a href="#javascript-dependencies">Typescript Dependencies</li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

## Introduction
<p>This project was a quick single-page web application where I used TypeScript with React and Redux in the frontend. I created a server with Express.js with basic CRUD functionalities and used MongoDB as the database.</p>
<p>Disclaimer: This project is not made for production.</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [Redux][Redux-url]
* [React][React-url]
* [TypeScript][TypeScript-url]
* [Mongoose][Mongoose-url]
* [Express.js][Express-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

### JavaScript Dependencies
1) Navigate to the root directory of the project and use npm (Node Package Manager) to create a project and run: `npm init -y`.
2) Use npm to install the JavaScript libraries and packages which can be found in the `package.json` file.
### Python Dependencies  
1) To install the required Python dependencies, navigate to the project's root directory and run: `pip install -r requirements.txt`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started
1) You need to create a Cloudinary account and create a `.env` file and get these THREE keys after creating an account.
* **CLOUDINARY_CLOUD_NAME** - CLOUDINARY_CLOUD_NAME=``<br>
* **CLOUDINARY_KEY** - CLOUDINARY_KEY=``<br>
* **CLOUDINARY_SECRET** - CLOUDINARY_SECRET=``<br>
2) Change `secret` in `app.js` for the session configuration.
3) Connect to the correct Mongo database in the `app.js` file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage
To run the website on your local server,  please .

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS -->
[Redux-url]: https://cloudinary.com/developers](https://react-redux.js.org/tutorials/typescript-quick-start)
[React-url]: https://www.typescriptlang.org/docs/handbook/react.html
[Mongoose-url]: https://www.npmjs.com/package/mongoose
[TypeScript-url]: https://www.typescriptlang.org/
[Mongoose-url]: https://www.python.org/
[Express-url]: https://expressjs.com/
