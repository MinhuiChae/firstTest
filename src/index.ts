import express from "express";
const port: string | number = process.env.PORT || 5000;
import bodyParser from "body-parser";

const app = express(); // express 객체
const routes = require("../src/routes/route");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.use(routes);

app.listen(port, ()=> console.log(`Listen on port ${port}`))