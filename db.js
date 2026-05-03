const express = require("express");
const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "projeto",
  password: "12345",
  port: 5432
});

module.exports = db;