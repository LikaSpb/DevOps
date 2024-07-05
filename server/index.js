const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express" });
});

app.get("/users", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.send(rows);
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO users(name) VALUES($1)", [name]);
  res.status(201).send(`User added with name: ${name}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
