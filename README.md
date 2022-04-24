# Blog API MERN

Blog MERN app built with React as frontend client, Node/Express as backend server, MongoDB for data storage, and using Heroku to host it online.

Made to practice working with frontend to backend communication and furthering my knowledge on user authentication with PassportJS using JWT.

## Table of contents

- [Github & Live](#github--live)
- [Getting Started](#getting-started)
- [React](#react)
- [Deploy](#deploy)
- [Features](#features)
- [Status](#status)
- [Contact](#contact)

# Github & Live

Github repo can be found [here](https://github.com/gizinski-jacek/blog-API-MERN).

This repo is live on [Heroku](https://blog-api-mern-360821.herokuapp.com).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Install all dependancies by running:

```bash
npm install
```

In the project root directory run the app with:

```bash
npm run all
```

This will use **_concurrently_** module to start Node server and React client app.

Open [http://localhost:3000](http://localhost:3000) to view frontend App in the browser.\
Open [http://localhost:4000/api](http://localhost:4000/api) to view backend API in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Build the app for production to the `build` folder with:

```bash
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deploy

You can easily deploy this app using [Heroku Platform](https://devcenter.heroku.com/articles/git).

Script for running app build after deployment to Heroku is included in package.json.\
In the project root directory run these commands:

```bash
heroku create
git push heroku main
heroku open
```

## Features

- Responsive User Interface
- Create and authenticate users
- Create, edit and delete blog posts
- Publish and unpublish existing posts
- Comment on blog posts
- Save data in localStorage
- Reset form data
- Print the CV

## Status

Project status: **_FINISHED_**

## Contact

Feel free to contact me at:

```
jacektrg@gmail.com
```
