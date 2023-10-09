# harmony-db

### Description
`harmony-db` is a PostgreSQL database for the `harmony` web app.

### Setting up `harmony-db`
Copy the `.env.example` file, and create an `.env` file
with your PostgreSQL credentials

### Running `harmony-db`
Run `docker-compose up -d`


### Clearing `harmony-db`
Run `docker-compose down -v`


## Alternative run method

### Building `harmony-db`
Run `docker build . -t harmony-db`


### Running `harmony-db`
Run the docker container using the command `docker run -p 5432:5432 harmony-db`