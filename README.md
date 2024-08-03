# My Back End G-Weather-Forecast

Welcome to **My Back End G-Weather-Forecast**! This is a NestJS application designed to handle request from [My Front End G-Weather-Forecast](https://github.com/Devbeee/G-Weather-Forecast-FE.git). Follow the instructions below to get started with the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Settings](#settings)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://classic.yarnpkg.com/)
- [git](https://git-scm.com/)

## Installation

1. Install the Nest CLI globally:

  ```bash
    npm i -g @nestjs/cli
  ```

2. Clone the repository:

    ```bash
    git clone https://github.com/Devbeee/G-Weather-Forecast-BE.git
    ```

3. Navigate into the project directory:

    ```bash
    cd G-Weather-Forecast-BE
    ```

4. Install the project dependencies:

    Using npm:

    ```bash
    npm install
    ```

## Settings

At the root of the project, create a .env file and add the following environment variables
```
PORT = 
CLIENT_URL = your_client_url
WEATHER_API_URL = http://api.weatherapi.com/v1
SERVER_API_URL = your_server_url/api/v1
WEATHER_API_KEY = your_weatherapi_key
MONGO_CONNECTION_URL = mongodb+srv://your_mongodb_connection_url
EMAIL_USER = your_email
EMAIL_PASS = your_password

```
- Replace your_client_url with your actual client URL.
- Replace your_server_url with your actual server URL.
- Replace your_mongodb_connection_url with your actual MongoDB connection URL.
- Replace your_weatherapi_key with the API key from [WeatherAPI](https://www.weatherapi.com).
- Replace your_password with your Google app password from [google](https://myaccount.google.com/u/1/apppasswords).

## Running the Project

To start the development server and run the project locally, use the following command:

Using npm:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment

The server is deployed with Render: [G-Weather-Forecast](https://api-weather-forecast.onrender.com/api/v1) 
