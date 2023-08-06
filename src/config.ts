const PostgresConfig = {
  client: "pg",
  connection: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ...(process.env.POSTGRES_SSL === "true" && {
      ssl: { rejectUnauthorized: false },
    }),
  },
};

export default PostgresConfig;
