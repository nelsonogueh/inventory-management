require('dotenv').config()
const express = require('express');
const app = express();
const userRoute = require('./Route/userRoute')
const productRoute = require('./Route/productRoute')
app.use(express.json())

const responseInfo = {
    status: "",
    message: ""
}

PORT = process.env.PORT;

// Default route handler
app.get("/", (req, res) => {
    res.send("Welcome to Group 1 Inventory Management System");
})

// User Route Handler
app.use('/users/', userRoute)

// Product Route Handler
app.use('/products/', productRoute)


app.all("*", (req, res) => {
    responseInfo.status = "error";
    responseInfo.message = "Sorry! You do not have authorization to access this route"

    res.send(responseInfo)
})

app.listen(PORT, () => {
    console.log(`Server running at 127.0.0.1:${PORT}`);
})
