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
        DATABASE_NAME: "test_qb1l",
        DATABASE_DIALECT: "postgres",
        DATABASE_HOST:
          "postgresql://root:c30XcKm7gvwPN6buSzNCr9SNOzuisTbd@dpg-cqoecq2j1k6c73b3rqc0-a/test_qb1l",
        DATABASE_PORT: 5432,
        DATABASE_USER: "root",
        DATABASE_PASSWORD: "c30XcKm7gvwPN6buSzNCr9SNOzuisTbd",
        JWT_SECRET: "test",
      },
    },
  ],
};
