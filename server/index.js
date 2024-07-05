const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express" });
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.post("/users", async (req, res) => {
  const { name } = req.body;
  const result = await pool.query(
    "INSERT INTO users(name) VALUES($1) RETURNING *",
    [name]
  );
  if (result.rows && result.rows.length) {
    res.status(201).json(result.rows[0]);
  } else {
    res.status(500).json({ message: "Error adding user" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
