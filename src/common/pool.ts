import express from "express"
const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit:10, //최대 커넥션 갯수
  host: 'localhost',
  user: 'cmh03',
  password: '0330',
  database: 'nodejs'
})

module.exports = pool;