import { useState } from "react";
import { WorkoutItem } from "./WorkoutItem";
import { FormData, Plan } from "../types/types";

export const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    duration: 30,
    targetMuscle: "",
    fitnessLevel: "",
    goal: "",
    equipment: [] as string[],
  });
  const [workout, setWorkout] = useState<Plan>({
    id: "",
    muscleGroup: "",
    duration: 0,
    fitnessLevel: "",
    equipment: [],
    goal: "",
    workout: {
      title: "",
      duration: 0,
      exercises: [],
      advice: "",
    },
  });

  const handleInputChange = (
    name: string,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePlan = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: {
            muscleGroup: formData.targetMuscle,
            duration: formData.duration,
            fitnessLevel: formData.fitnessLevel,
            equipment: formData.equipment,
            goal: formData.goal,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Network response not ok");
      }
      const data = await response.json();
      console.log(data.savedConversation);

      setWorkout(data.savedConversation);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating plan", error);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
      <p className="mb-4">Skapa din personliga träningsplan</p>
      {/* Duration Slider */}
      <div className="mb-4">
        <label htmlFor="duration" className="block font-medium mb-2">
          Träningstid (minuter)
        </label>
        <input
          type="range"
          id="duration"
          min={10}
          max={120}
          step={5}
          value={formData.duration}
          onChange={(e) =>
            handleInputChange("duration", Number(e.target.value))
          }
          className="w-full"
        />
        <p className="text-right">{formData.duration} minuter</p>
      </div>
      {/* Target Muscle Select */}
      <div className="mb-4">
        <label htmlFor="targetMuscle" className="block font-medium mb-2">
          Målmuskel
        </label>
        <select
          id="targetMuscle"
          onChange={(e) => handleInputChange("targetMuscle", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Välj målmuskel</option>
          <option value="Bröst">Bröst</option>
          <option value="Rygg">Rygg</option>
          <option value="Ben">Ben</option>
          <option value="Axlar">Axlar</option>
          <option value="Armar">Armar</option>
        </select>
      </div>
      {/* Fitness Level Select */}
      <div className="mb-4">
        <label htmlFor="fitnessLevel" className="block font-medium mb-2">
          Konditionsnivå
        </label>
        <select
          id="fitnessLevel"
          onChange={(e) => handleInputChange("fitnessLevel", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Välj din konditionsnivå</option>
          <option value="Nybörjare">Nybörjare</option>
          <option value="Medel">Medel</option>
          <option value="Avancerad">Avancerad</option>
        </select>
      </div>
      {/* Goal Select */}
      <div className="mb-4">
        <label htmlFor="goal" className="block font-medium mb-2">
          Träningsmål
        </label>
        <select
          id="goal"
          onChange={(e) => handleInputChange("goal", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Välj ditt träningsmål</option>
          <option value="Styrka">Styrka</option>
          <option value="Uthållighet">Uthållighet</option>
          <option value="Viktminskning">Viktminskning</option>
          <option value="Muskelökning">Muskelökning</option>
        </select>
      </div>
      {/* Equipment Checkboxes */}
      <div className="mb-4">
        <p className="font-medium mb-2">Tillgänglig utrustning</p>
        <div className="space-y-2">
          {[
            "Hantlar",
            "Skivstång",
            "Träningsmaskin",
            "Gummiband",
            "Ingen utrustning",
          ].map((item) => (
            <div key={item}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={item}
                  onChange={(e) =>
                    handleInputChange(
                      "equipment",
                      e.target.checked
                        ? [...formData.equipment, e.target.value]
                        : formData.equipment.filter((i) => i !== e.target.value)
                    )
                  }
                />
                <span>{item}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Generate Button */}
      <button
        onClick={generatePlan}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Generera träningsplan
      </button>

      <h3 className="font-semibold mb-2">Ditt personliga träningspass:</h3>
      {workout && workout.workout ? ( // Kontrollera att workout inte är undefined
        <WorkoutItem workout={workout.workout} />
      ) : (
        <p>Inga träningspass tillgängliga.</p> // Meddelande om det inte finns något workout
      )}
    </div>
  );
};
