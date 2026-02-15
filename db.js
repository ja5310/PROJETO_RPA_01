import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rpamontagem",
  password: "Familia3614",
  port: 5432,
});

export default pool;
