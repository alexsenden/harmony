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

# Running The Dataset Seed Script

1. Install Postgresql (https://www.postgresql.org/download/windows/)
1. Extract `db_seed.sql` from the `db_seed.zip` file in this directory
1. Open the `psql` terminal
1. Log in to the database using the corresponding credentials
1. Enter the command `SET CLIENT_ENCODING TO 'utf8';`
1. Run the `db_seed.sql` script (found in this directory) in the psql terminal. The command is: `\i <path_to_script>`.

The script will take a few minutes to execute.

#### Note: If you are on windows, make sure the path to the file uses `/`, not `\`, otherwise you will get a `Permission Denied` error.

#### Note 2: The DB seed will conflict with the testing seed data. Make sure you clear the database before running this seed script.
