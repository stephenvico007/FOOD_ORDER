import dotenv from "dotenv";

dotenv.config();

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/database.js");

const PORT = 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
};

startServer();