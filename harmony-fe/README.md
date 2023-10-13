# harmony-fe

### Description

`harmony-fe` is a NextJS frontend for the `harmony` web app.

### Setup

1. Install NodeJS and npm
2. Install nvm, and then run `nvm use`
3. Run `npm i` to install all dependencies
4. Copy `.env.example` into a new file called `.env`

### Running `harmony-fe` Locally

Run the command `npm run dev`
`harmony-fe` is available at `localhost:8080`.

### `harmony-fe` Production Build

1. Build the docker image using the command `docker build . -t harmony-fe --build-arg="ENV=prod"`

   NOTE: If you are building the image for use locally (not for the actual server), omit `--build-arg="ENV=prod"`

2. Run the docker container using the command `docker run -p 8080:8080 harmony-fe`
