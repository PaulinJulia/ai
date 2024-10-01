import express from "express";
import cors from "cors";
import { conversationRouter } from "./routes/conversation";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/conversation", conversationRouter);

const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
