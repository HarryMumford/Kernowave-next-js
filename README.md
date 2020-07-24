# Kernowave

[Visit](https://kernowave-next-js.vercel.app/)

## Description

A responsive frontend app that calculates the quality of surf on beaches in Cornwall. A traffic light colour system is indicative of the surf quality and is calculated based on wind speed, coast orientation, swell size and wind direction.

#### Web view

![web-app](/public/web.png)

#### Mobile view

![mobile-app](/public/mobile.png)

## Technologies

The app uses next.js, react, styled-components and react-slick. The dynamic and restful next.js routing allows this app to be easily scalable when adding additional beaches from Magic Seaweed's API.

## Installation

```
npm install
npm run dev
```

## Future development

I am currently working on deploying the app using Vercel and Heroku and using axios to mock api swell and wind conditions.

[![CircleCI](https://circleci.com/gh/AndreaDiotallevi/archquery.svg?style=shield)](https://circleci.com/gh/AndreaDiotallevi/archquery)

# Kernowave

[Description](#description) | [Live Website](#live-website) | [Technologies Used](#technologies-used) | [Challenges and Goals](#challenges-and-goals) | [Getting Started](#getting-started) | [How to Run the App](#how-to-run-the-app) | [How to Setup the Local Database](#how-to-setup-the-local-database) | [How to Run the Tests](#how-to-run-the-tests) | [Continuous Integration and Delivery](#continuous-integration-and-delivery) | [Design Approach](#design-approach) | [Database Schema](#database-schema) | [Next Tasks](#next-tasks)

## Description

A minimalistic, sleek and responsive interface for displaying the surf conditions on two beaches in Cornwall. The traffic light colours indicate the surf quality which is calculated from several parameters including windspeed, wind direction, coast orientation and swell height. 

## Live Website

The application is deployed with vercel [Here](https://kernowave-next-js.vercel.app/)

|                  Home Page                  |                  Question Page                  |
| :-----------------------------------------: | :---------------------------------------------: |
| ![](./client/src/assets/archquery-home.png) | ![](./client/src/assets/archquery-question.png) |

## Technologies Used

- Main technologies:
  - [Next] (https://nextjs.org/): Used for its server-side page prerendering, server-side data fetching and client-side route transitions. 
  - [React](https://reactjs.org/): Used for its reusable component based structure, virtual DOM perfomance enhancements.
  - [Styled components](https://reactjs.org/): For its modular / component css that makes styling react components very easy.

## Challenges and Goals

-[x] Learn about serverside prerendering and data fetching with NextJS to enhance rendering performance.
-[x] Use NextJS's smooth page transitions for better user experience.
-[x] Create a responsive app styled with component based css that looks clean, simple on all screen sizes.
-[x] Consume, manipulate and reproduce complex third party API data into a simple user interface.

## Getting Started

In terminal and desired file location:
1. `git clone 

## How to Run the App

- To start the Redis server, on a separate terminal, type `redis-server`
- To start the Express server type `npm run server`
- To start the React server type `npm run client`
- To start both servers concurrently type `npm run dev`

## How to Setup the Local Database

- Type `psql postgres` to start the PostgreSQL command line interface
- Open the `database.sql` file located in the root directory and run all commands in the terminal
- Quit the command line interface with `\q`
- Create a `.env` file in the root directory with the following credentials (replace <...> with your unique values):

  ```
  PG_USER = <your_username>
  PG_PASSWORD = <your_password>
  PG_HOST = localhost
  PG_PORT = 5432
  PG_DATABASE = archquery
  SECRET_KEY = <secret_key>
  ```

## How to Run the Tests

- To run all the express API endpoints tests type `npm test`
- To run all the React components tests type `npm run client-test`

## Continuous Integration and Delivery

[CircleCI](https://circleci.com/) is used for automating the development process quickly, safely, and at scale.

- When a branch is pushed to GitHub, all tests are run within a container, to ensure code quality

- When the master branch is pushed to GitHub, Heroku deploys automatically is no automated test fails

## Design Approach

<p align="center">
  <img src="./client/src/assets/react-components-diagram.svg" alt="react-components-diagram"></img>
</p>

## Database Schema

<p align="center">
  <a href="https://drawsql.app/andrea-diotallevi/diagrams/archquery">
    <img src="./client/src/assets/database-schema.png" alt="database-schema"></img>
  </a>
</p>

## Next Tasks

- Implement proper database creation and migration for collaboration and testing
- Complete API endpoint testing for all routes
- Build user profile page with options to upload image and personal details
- Implement comments feature for questions and answers
- Add service for dynamic implementation of user avatar image
- Implement service for counting views for each question page
- Move application to AWS Elastic Beanstalk
