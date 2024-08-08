# Description:

This is a simple API project meant to serve a react CRUD application as an exercise.

As a challenge I chose to use Typescript as language of choise and PosgreSQL as the database.

To run localy simply clone this repo and run `nodemon --exec 'node --loader ts-node/esm' src/server.ts` on terminal to start local serving.

# Deploy

This project is hosted on render.com and ran using pm2 as a daemon process manager.

# Issues

- Couldn't figure out how to make PosgreSQL migrations using Typescript.
