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
// conversationRouter.get("/", async (request: Request, response: Response) => {
//   const conversation = await findConversation();
//   response.json(conversation);
// });

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
    console.log(aiResponse);

    const planToSave: Plan = {
      muscleGroup: muscleGroup,
      duration: duration,
      fitnessLevel: fitnessLevel,
      equipment: equipment,
      goal: goal,
      workout: aiResponse,
    };
    const savedConversation = await createPrompt(planToSave);

    response.status(201).json({ savedConversation });
  } catch (error) {
    console.error("Error fetching from OpenAI", error);
    response.status(500).json({ error: "Failed to process conversation." });
  }
}
// Hämta OpenAI:s svar
// const completion = await openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   messages: [
//     { role: "system", content: "You are a helpful assistant." },
//     { role: "user", content: prompt },
//   ],
// });

// const aiResponse = completion.choices[0].message.content;

// if (!aiResponse) {
//   return response.status(500).json({ error: "No response from OpenAI." });
// }

// Spara användarens prompt och OpenAI:s svar
// await createPrompt(prompt, "user");
// const savedConversation = await createPrompt(aiResponse, "assistant");

// response.status(201).json(savedConversation);
//   } catch (error) {
//     console.error("Error fetching from OpenAI", error);
//     return response
//       .status(500)
//       .json({ error: "Failed to fetch response from OpenAI." });
//   }
// };

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
