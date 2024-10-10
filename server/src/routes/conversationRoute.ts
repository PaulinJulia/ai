import express from "express";
import {
  getConversation,
  createConversation,
} from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.get("/data", getConversation);
conversationRouter.post("/conversation", createConversation);

export default conversationRouter;
