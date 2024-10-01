import express from "express";

import {
  findPrompt,
  findConversation,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../models/conversationCrud";

const conversationRouter = express.Router();

// GET /conversation
conversationRouter.get("/", async (request, response) => {
  const conversation = await findConversation();
  response.json(conversation);
});

// GET /conversation/:id
conversationRouter.get("/:id", async (request, response) => {
  const prompt = await findPrompt(request.params.id);
  if (prompt) {
    response.json(prompt);
  } else {
    response.status(404).end();
  }
});

// POST /conversation
conversationRouter.post("/", async (request, response) => {
  const createdPrompt = await createPrompt(request.body);
  response.status(201).json(createdPrompt);
});

// PUT /conversation/:id
conversationRouter.put("/:id", async (request, response) => {
  const updatedPrompt = await updatePrompt(request.params.id, request.body);
  response.json(updatedPrompt);
});

// DELETE /conversation/:id
conversationRouter.delete("/:id", async (request, response) => {
  await deletePrompt(request.params.id);
  response.status(204).end();
});

export { conversationRouter };
