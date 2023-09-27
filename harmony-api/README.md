# harmony-api

### Description

`harmony-api` is an Express-based RESTful API for the `harmony` web app.

### Setup

1. Install NodeJS and npm
2. Install nvm, and then run `nvm use`
3. Run `npm i` to install all dependencies
4. Copy `.env.example` into a new file called `.env`

### Running `harmony-api` Locally

Run the command `npm run dev`.
`harmony-api` is available at `localhost:8081`.

### `harmony-api` Production Build

1. Build the docker image using the command `docker build . -t harmony-api`
2. Run the docker container using the command `docker run -p 8081:8081 harmony-api`
