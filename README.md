# Bladedrone

Companion site for the free to play first-person shooter, [Ironsight](https://ironsight.aeriagames.com/). This application aims to allows its users to:

1. Look up weapons, killstreaks, emblems, and other assets.
2. Compare stats.
3. View skins.
4. Create and share custom classes by a single link.

## Stack

This application makes use of the [MEAN](http://mean.io/) stack (MongoDB, Express.js, Angular 6, Node.js).

## Structure

`angular/` - contains all of the frontend code (what the user interracts with).  
`express/` - contains all backend code (api calls to get data from MongoDB).

This project is built with the SCSS style option turned on.

## Run Instructions

1. First, make sure MongoDB is running.
2. `cd bladedrone/express/ && npm start` (to auto refresh the server, use [nodemon](https://github.com/remy/nodemon) instead)
3. Open another terminal.
4. `cd bladedrone/angular/ && ng serve --open`
5. Navigate to `localhost:4200`
