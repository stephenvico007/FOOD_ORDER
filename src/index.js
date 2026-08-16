import dotenv from "dotenv";
import app from "./app.js";
dotenv.config();



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`)
});