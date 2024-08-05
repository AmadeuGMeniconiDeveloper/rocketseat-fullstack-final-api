module.exports = {
  apps: [
    {
      name: "rocketseat-fullstack-final-api",
      script: "build/server.js",
      instances: 1,
      watch: true,
      env: {
        NODE_ENV: "test",
        PORT: 3000,
        DATABASE_NAME: "foodexplorer-test",
        DATABASE_DIALECT: "postgres",
        DATABASE_HOST: "localhost",
        DATABASE_PORT: 5432,
        DATABASE_USER: "root",
        DATABASE_PASSWORD: "root",
        JWT_SECRET: "test",
      },
    },
  ],
};
