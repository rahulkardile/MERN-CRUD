const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRouter") 


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.URL;

mongoose.connect(URL)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("Error Found " + error);
    })

app.use("/api/user" ,userRoutes);

app.listen(PORT, () => {
    console.log("Server is running . . .");
})