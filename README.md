# Description:

This is a simple API project meant to serve a react CRUD application as an exercise.

As a challenge I chose to use Typescript as language of choise and PosgreSQL as the database.

To run localy simply clone this repo and run `yarn` on terminal to get all dependencies.

Then you'll need docker installed in your machine to fetch image/build container of the postgresql DB. Use `docker build -t rocketseat-fullstack-final-api-postgres .` to run the dockerfile then `docker run --name rocketseat-fullstack-final-api-db-container -d -p 5432:5432 rocketseat-fullstack-final-api-postgres`. Run `docker ps` to check if container is up and running.

# Deploy

This project is hosted on render.com and ran using pm2 as a daemon process manager (very slow).

# Issues

- Couldn't figure out how to make PosgreSQL migrations using Typescript.
