import express from "express";
import cors from "cors";
import conversationRouter from "./routes/conversationRoute";

const corsOptions = {
  origin: "http://localhost:4000",
  credentials: true, // För att tillåta cookies och andra credentials
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// app.get("/", (request, response) => {
//   response.send("Hello World!");
// });

app.use("/api", conversationRouter);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
