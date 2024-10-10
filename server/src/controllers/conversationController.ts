import { Request, Response } from "express";
import {
  findPrompt,
  findConversation,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../models/conversationCrud";
import { openAiService } from "../services/openaiService";
import { Plan, Workout } from "../models/conversationModel";

// const conversationRouter = express.Router();

// GET /conversation
export async function getConversation(request: Request, response: Response) {
  try {
    const conversation = await findConversation();
    response.status(201).json(conversation);
  } catch (error) {
    console.error("Error fetching", error);
    response.status(500).json({ error: "Failed to process conversation." });
  }
}

// GET /conversation/:id
// conversationRouter.get("/:id", async (request: Request, response: Response) => {
//   const prompt = await findPrompt(request.params.id);
//   if (prompt) {
//     response.json(prompt);
//   } else {
//     response.status(404).end();
//   }
// });

// POST /conversation
export async function createConversation(request: Request, response: Response) {
  const { plan } = request.body;
  const { muscleGroup, duration, fitnessLevel, equipment, goal } = plan;

  try {
    const aiResponse = await openAiService(plan);
    // console.log(aiResponse);

    const planToSave: Plan = {
      muscleGroup: muscleGroup,
      duration: duration,
      fitnessLevel: fitnessLevel,
      equipment: equipment,
      goal: goal,
      workout: aiResponse,
      createdAt: new Date(),
    };
    const savedConversation = await createPrompt(planToSave);

    response.status(201).json({ savedConversation });
  } catch (error) {
    console.error("Error fetching from OpenAI", error);
    response.status(500).json({ error: "Failed to process conversation." });
  }
}

// PUT /conversation/:id
// conversationRouter.put("/:id", async (request: Request, response: Response) => {
//   const updatedPrompt = await updatePrompt(request.params.id, request.body);
//   response.json(updatedPrompt);
// });

// DELETE /conversation/:id
// conversationRouter.delete("/:id", async (request: Request, response: Response) => {
//   await deletePrompt(request.params.id);
//   response.status(204).end();
// });
