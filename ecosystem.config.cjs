module.exports = {
  apps: [
    {
      name: "rocketseat-fullstack-final-api",
      script: "build/server.js",
      instances: "max",
      // env: {
      //   NODE_ENV: "test",
      //   PORT: 3000,
      //   DATABASE_NAME: "test_qb1l",
      //   DATABASE_DIALECT: "postgres",
      //   DATABASE_HOST: "dpg-cqoecq2j1k6c73b3rqc0-a",
      //   DATABASE_PORT: 5432,
      //   DATABASE_USER: "root",
      //   DATABASE_PASSWORD: "c30XcKm7gvwPN6buSzNCr9SNOzuisTbd",
      //   JWT_SECRET: "test",
      // },
      // env_development: {
      //   NODE_ENV: "development",
      //   PORT: 3001,
      //   DATABASE_NAME: "foodexplorer-development",
      //   DATABASE_DIALECT: "postgres",
      //   DATABASE_HOST: "localhost",
      //   DATABASE_PORT: 5432,
      //   DATABASE_USER: "root",
      //   DATABASE_PASSWORD: "root",
      //   JWT_SECRET: "development",
      // },
      // env_production: {
      //   NODE_ENV: "production",
      //   PORT: 3002,
      //   DATABASE_NAME: "",
      //   DATABASE_DIALECT: "postgres",
      //   DATABASE_HOST: "",
      //   DATABASE_PORT: 5432,
      //   DATABASE_USER: "root",
      //   DATABASE_PASSWORD: "",
      //   JWT_SECRET: "production",
      // },
    },
  ],
};
