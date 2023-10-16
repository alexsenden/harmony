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
2. Download `db_seed.sql` from [here](https://umanitoba-my.sharepoint.com/:u:/g/personal/sendena_myumanitoba_ca/EZDa65g1TIZAmEbQKyWGwh4BIsxXC1iv8Qp6rZ8HeU4avg?e=v3vkHQ)
3. Open the `psql` terminal
4. Log in to the database using the corresponding credentials
5. Enter the command `SET CLIENT_ENCODING TO 'utf8';`
6. Run the `db_seed.sql` script in the psql terminal. The command is: `\i <path_to_script>`.

The script will take a few minutes to execute.

Note: If you are on windows, make sure the path to the file uses `/`, not `\`, otherwise you will get a `Permission Denied` error.
