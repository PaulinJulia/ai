import express from "express";
import {
  getConversation,
  createConversation,
  saveWorkout,
  deletePlan,
} from "../controllers/conversationController";

const conversationRouter = express.Router();

conversationRouter.get("/data", getConversation);
conversationRouter.post("/conversation", createConversation);
conversationRouter.post("/saveWorkout", saveWorkout);
conversationRouter.delete("/removeWorkout/:id", deletePlan);

export default conversationRouter;
