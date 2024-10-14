import OpenAI from "openai";
import { Plan } from "../models/conversationModel";
import { Workout } from "../models/conversationModel";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// function parseWorkoutFromText(aiResponse: string): Workout {
//   // Dela upp AI-svaret i rader
//   const lines = aiResponse.split("\n").filter((line) => line.trim() !== "");

//   // Extrahera titel (kan justeras beroende på hur svaret är strukturerat)
//   const title = lines[0]?.trim() || "Träningspass från AI";

//   // Försök att hämta duration, här kan du justera för att extrahera från texten om nödvändigt
//   const durationMatch = aiResponse.match(/(\d+)\s*minuter/);
//   const duration = durationMatch ? parseInt(durationMatch[1]) : 30; // Använd 30 som standard

//   // Extrahera övningar
//   const exercises = lines.slice(1).map((line) => {
//     const parts = line.split(":"); // Anta att övningar är avformatte som "Övning: x set x y reps"
//     const name = parts[0]?.trim() || "Övning utan namn";

//     // Hämta sets och repetitioner
//     const setsRepsMatch = parts[1]?.match(/(\d+)\s*set\s*x\s*(\d+)/); // Exempel: "3 set x 12"
//     const sets = setsRepsMatch ? parseInt(setsRepsMatch[1]) : undefined;
//     const repetitions = setsRepsMatch ? parseInt(setsRepsMatch[2]) : undefined;

//     return {
//       name,
//       sets,
//       repetitions,
//       explanation: parts[2]?.trim() || "Ingen förklaring angiven.", // Extra förklaring om den finns
//     };
//   });

//   return {
//     title,
//     duration,
//     exercises,
//     advice: "Fokusera på rätt teknik.", // Här kan du också lägga till ett råd om det finns i svaret
//   };
// }
function parseWorkoutFromText(aiResponse: string): Workout {
  try {
    const cleanedResponse = aiResponse
      .trim()
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "");

    const workout = JSON.parse(cleanedResponse);

    if (!workout.title || !Array.isArray(workout.exercises)) {
      throw new Error("Det inkommande objektet har inte rätt struktur.");
    }

    return workout;
  } catch (error) {
    console.error("Fel vid parsing av AI-svaret:", error);
    console.error("Original AI response:", aiResponse); // Logga det ursprungliga svaret för att hjälpa till med felsökning
    throw error;
  }
}

export async function openAiService(prompt: Plan) {
  const { id, muscleGroup, duration, fitnessLevel, equipment, goal } = prompt;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
          content: `Generera ett JSON-objekt för en träningsplan med följande format:
      {
        "title": string,
        "warmUp": string,
        "exercises": [
          {
            "name": string,
            "explanation": string,
            "sets": number,
            "repetitions": number,
            "duration": number
          }
        ],
        "coolDown": string
        "advice": string,
        "wisdom": string
      }
      Skapa ett träningspass för ${duration} minuter för att träna ${muscleGroup}. Anpassa efter träningsnivå: ${fitnessLevel}. Mål: ${goal}. Utrustning som är tillgänglig: ${
            equipment.length > 0
              ? equipment.join(", ")
              : "Ingen utrustning (kroppsviktsträning)"
          }. Ge visdomsord eller citat för varje träningsplan. Ge förslag på börjande uppvärmning och avslutande nedvarvning som till exempel stretching. Svara endast med ett giltigt JSON-objekt utan extra text eller kommentarer.`,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    // console.log("AI svar:", aiResponse);
    if (!aiResponse || typeof aiResponse !== "string") {
      throw new Error("AI-svaret var null, undefined eller inte en sträng");
    }
    let workout;
    try {
      workout = parseWorkoutFromText(aiResponse);
    } catch (error) {
      console.error("Fel vid parsing av AI-svaret:", error);
      throw error;
    }

    return workout;
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
