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

Production .env files can be found in the `environment` directory.

1. Build the docker image using the command `docker build . -t harmony-api --build-arg="ENV=prod"`

   NOTE: If you are building the image for use locally (not for the actual server), omit `--build-arg="ENV=prod"`

2. Run the docker container using the command `docker run -p 8081:8081 harmony-api`

### Modifying the DB Schema (Migrations)

1. Change the `schema.prisma` file to create your changes
2. Run `npx prisma migrate dev`, and then enter a name for the migration when prompted
