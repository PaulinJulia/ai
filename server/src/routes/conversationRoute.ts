import express from "express";
import { createConversation } from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.post("/conversation", createConversation);

export default conversationRouter;
