import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function openAiService(text: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: text,
        },
      ],
    });
    const aiResponse = completion.choices[0].message.content;

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
