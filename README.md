# Nestjs Api

Front-end app on [front-react](https://github.com/lehh/front-react)
## Requirements
Node >= v12.21.0

Yarn >= 1.22.5
## Installation

Copy required files
```bash
cp .env.example .env
cp docker-compose.example.yml docker-compose.yml
```
### Database

If you don't already have a postgres database, just run `docker-compose up -d`.
This will create a postgres docker container for you. Make sure you have `docker` and `docker-compose` installed on your system.

Create a new database on your postgres database and put its name on the .env `DB_NAME` variable.

### Starting the app

Configure the env variables on the .env file according to your enviroment.

Install dependencies
```bash
yarn install
```

Run migrations to create tables and seed the database with services.

```bash
yarn migration:run
```

Start the API

```bash
yarn start
```

## Users

username: client |
password: 1234

username: professional |
password: 5678