# Installing the CLI

To install the Sequelize CLI:

```bash
yarn add sequelize-cli -D
```

# Project bootstraping

To create an empty project you will need to execute init command

```bash
npx sequelize-cli init
```

This will create following folders

- `config`: contains config file, which tells CLI how to connect with database
- `models`: contains all models for your project
- `migrations`: contains all migration files
- `seeders`: contains all seed files

## Configuration

Before continuing further we will need to tell the CLI how to connect to the database. To do that
let's open default config file `config/config.json`. It looks something like this:

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Now edit this file and set correct database credentials and dialect. The fields of the objects are used on `model/index.ts` for matching `process.env.NODE_ENV`.

Sequelize will use the default connection port for each dialect. If you need to specify a different port, add the `"port"` field.

> **Note:** _f your database doesn't exist yet, you can just call `db:create` command. With proper access it will create that database for you._

# Model and Migrations

Once you have properly configured CLI config file you are ready to create your first migration. It's as simple as executing a simple command.

We will use `model:generate` command. This command requires two options:

- `name`: the name of the model;
- `attributes`: the list of model attributes.
  Let's create a model named User.

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

This will:

- Create a model file `user` in `models` folder;
- Create a migration file with name like `XXXXXXXXXXXXXX-create-user.ts` in migrations folder.

> **Note:** _Sequelize will only use Model files, it's the table representation. On the other hand, the migration file is a change in that model or more specifically that table, used by CLI. Treat migrations like a commit or a log for some change in database._

## Running Migrations

Until this step, we haven't inserted anything into the database. We have just created the required model and migration files for our first model, User. Now to actually create that table in the database you need to run db:migrate command.

```bash
npx sequelize-cli db:migrate
```

This command will execute these steps:

- Will ensure a table called `SequelizeMeta` in database. This table is used to record which migrations have run on the current database
- Start looking for any migration files which haven't run yet. This is possible by checking SequelizeMeta table. In this case it will run `XXXXXXXXXXXXXX-create-user.ts` migration, which we created in last step.
- Creates a table called `Users` with all columns as specified in its migration file.

## Undoing Migrations

Now our table has been created and saved in the database. With migration you can revert to old state by just running a command.

You can use `db:migrate:undo`, this command will revert the most recent migration.

```bash
npx sequelize-cli db:migrate:undo
```

You can revert back to the initial state by undoing all migrations with the `db:migrate:undo:all` command. You can also revert back to a specific migration by passing its name with the `--to` option.

```bash
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.ts
```

## Migration Skeleton

The following skeleton shows a typical migration file.

```ts
export const userMigration = {
  up: (queryInterface, Sequelize) => {
    // logic for transforming into the new state
  },
  down: (queryInterface, Sequelize) => {
    // logic for reverting the changes
  },
};
```

We can generate this file using `migration:generate`. This will create `xxx-migration-skeleton.ts` in your migration folder.

```bash
npx sequelize-cli migration:generate --name migration-skeleton
```

The passed `queryInterface` object can be used to modify the database. The Sequelize object stores the available data types such as `STRING` or `INTEGER`. Function `up` or `down` should return a `Promise`. Let's look at an example:

```ts
export const skeletonMigration = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Example", {
      name: Sequelize.DataTypes.STRING,
      isAllowed: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Example");
  },
};
```

> Learn more about [Sequelize Migration Skeleton](https://sequelize.org/docs/v6/other-topics/migrations/#migration-skeleton)

# Seeds

Suppose we want to insert some data into a few tables by default. If we follow up on the previous example we can consider creating a demo user for the `User` table.

To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database tables with sample or test data.

Let's create a seed file which will add a demo user to our `User` table.

```bash
npx sequelize-cli seed:generate --name demo-user
```

This command will create a seed file in `seeders` folder. File name will look something like `XXXXXXXXXXXXXX-demo-user.ts`. It follows the same `up / down` semantics as the migration files.

Now we should edit this file to insert demo user to `User` table.

```ts
export const userSeed = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "example@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
```

## Running Seeds

In last step you created a seed file; however, it has not been committed to the database. To do that we run a simple command.

```bash
npx sequelize-cli db:seed:all
```

This will execute that seed file and a demo user will be inserted into the `User` table.

> **Note:** _Seeder execution history is not stored anywhere, unlike migrations, which use the `SequelizeMeta` table. If you wish to change this behavior, please read the `Storage` section._

## Undoing Seeds

# The `.sequelizerc` file

This is a special configuration file. It lets you specify the following options that you would usually pass as arguments to CLI:

- `env`: The environment to run the command in
- `config`: The path to the config file
- `options-path`: The path to a JSON file with additional options
- `migrations-path`: The path to the migrations folder
- `seeders-path`: The path to the seeders folder
- `models-path`: The path to the models folder
- `url`: The database connection string to use. Alternative to using --config files
- `debug`: When available show various debug information

Some scenarios where you can use it:

- You want to override default path to `migrations`, `models`, `seeders` or `config` folder.
- You want to rename `config.json` to something else like `database.json`

To begin, let's create the `.sequelizerc` file in the root directory of your project, with the following content:

```ts
import path from "path";

export const sequelizerc = {
  config: path.resolve("config", "database.json"),
  "models-path": path.resolve("db", "models"),
  "seeders-path": path.resolve("db", "seeders"),
  "migrations-path": path.resolve("db", "migrations"),
};
```
