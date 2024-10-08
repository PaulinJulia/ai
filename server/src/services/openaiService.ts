import OpenAI from "openai";
import { Prompt } from "../models/conversationModel";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function openAiService(prompt: Prompt) {
  const { id, muscleGroup, duration, fitnessLevel, equipment, goal } = prompt;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        // {
        //   role: "system",
        //   content: `This assistant will suggest 6 restaurants based on user descriptions.
        //   It will provide Restaurant Names for those restaurants in the format of:
        //   RESTAURANT NAME1: [string], RESTAURANT NAME2: [string], RESTAURANT NAME3: [string],
        //   RESTAURANT NAME4: [string], RESTAURANT NAME5: [string], RESTAURANT NAME6: [string].

        //   Additionally, it will provide a motivation of maximum 120 characters for why these restaurants were suggested, in the format:
        //   MOTIVATION: [string].

        //   It will not answer any other queries. It will only suggest restaurants.

        //   Always use this structure exactly:
        //   RESTAURANT NAME1: [string],
        //   RESTAURANT NAME2: [string],
        //   RESTAURANT NAME3: [string],
        //   RESTAURANT NAME4: [string],
        //   RESTAURANT NAME5: [string],
        //   RESTAURANT NAME6: [string].
        //   The suggested restaurant names should go inside [string].
        //   Never add any additional numbers.
        //   MOTIVATION: [string]

        //   When making suggestions, follow these steps:
        //   1. If the query is inappropriate (i.e., foul language, sexual language that you deem inappropriate or anything else), don't suggest any restaurants but respond in a humorous way in maximum 250 characters. Ignore any queries in ${query} if foul language is present.
        //   2. If there are any queries in ${query}, add all of them to the search. The queries in ${query} are always in relation to the previous 4 queries. For example, if I search on "An Italian restaurant" and then search on "with mussels", the search should be "An Italian restaurant" + "with mussels".
        //   3. Examine the latest suggestions: ${latestSuggestions.join(", ")}.
        //   4. Avoid suggesting restaurants that are already in the latest suggestions.
        //   5. Consider the genres, themes, or keywords from the latest user query to refine the search.
        //   6. If a new user query suggests a refinement (e.g., from "asian" to "french"), adjust the suggestions accordingly.
        //   7. For each query in ${latestUserQuery}, ensure the suggestions are distinct and progressively refined based on the user's subsequent queries. Reference previous suggestions to avoid repetition and improve relevance.
        //   8. If no suitable suggestions are available, explain why and provide alternative options.
        //   For example, if the latest user query is "mexican swedish" and the latest suggestions included "La Neta" and "YUC Mexican", suggest restaurants that blend mexican and swedish while avoiding those already suggested.`,
        // },
        {
          role: "system",
          content: `Skapa en träningsplan för ${duration} minuter för att träna ${muscleGroup}. Träningsnivå: ${fitnessLevel}. Mål: ${goal}. Utrustning som är tillgänglig: ${
            equipment.length > 0
              ? equipment.join(", ")
              : "Ingen utrustning (kroppsviktsträning)"
          }. Ge specifika övningar med antal set och repetitioner.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log("AI response:", aiResponse);
    if (!aiResponse) {
      throw new Error("AI response was null or undefined");
    }
    return aiResponse;
  } catch (error) {
    console.error("Error fetching from OpenAi", error);
    throw error;
  }
}

// app.get("/question", async (req: Request, res: Response) => {
//   console.log("Hej från route /question");

//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "Vad är världens högsta berg?" }],
//     model: "gpt-3.5-turbo",
//   });
//   console.log(completion.choices);
// });
