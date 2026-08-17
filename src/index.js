import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

const PORT = 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
};

startServer();