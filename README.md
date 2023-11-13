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
        <li><a href="#frontend-setup">Frontend Setup</li>
        <li><a href="#backend-setup">Backend Setup</li>
      </ul>
    </li>
    <li><a href="#notes">Notes</a></li>
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

## Application Setup
In order to successfully execute this project, you will need to do all of the following setup items. Please follow the instructions below, from top to bottom sequentially, to make sure that you are set up to run the app. The app is run on a React frontend, Express back-end, and a MongoDB database.
### Installation
1) Clone the repository
```bash
git clone https://github.com/KevinSong0428/TaskManager.git
```
### Frontend Setup
1) Change into frontend directory
```bash
cd task-manager
```
2) Install dependencies
```bash
npm install
```
3) Start the web browser
 ```bash
npm run dev
```

### Backend Setup 
1) Change into the backend directory
```bash
cd server
```
2) Install dependencies
```bash
npm install
```
3) Starting the backend
 ```bash
npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Notes
<ul>
  <li>Make sure you have Node.js, npm, and MongoDB installed on your machine.</li>
  <li>The server and task manager are separate applications, so you must set them up individually.</li>
  <li>Ensure that the MongoDB connection string in the server matches your MongoDB setup.</li>
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS -->
[Redux-url]: https://react-redux.js.org/tutorials/typescript-quick-start
[React-url]: https://www.typescriptlang.org/docs/handbook/react.html
[Mongoose-url]: https://www.npmjs.com/package/mongoose
[TypeScript-url]: https://www.typescriptlang.org/
[Mongoose-url]: https://www.python.org/
[Express-url]: https://expressjs.com/
