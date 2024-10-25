import OpenAI from "openai";
import { Plan } from "../models/conversationModel";
import { Workout } from "../models/conversationModel";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
          }. Ge ett unikt visdomsord eller citat för varje träningsplan. Ge förslag på börjande uppvärmning och avslutande nedvarvning. Undvik att föreslå samma övningar och råd från tidigare förslagen. Svara endast med ett giltigt JSON-objekt utan extra text eller kommentarer.`,
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
