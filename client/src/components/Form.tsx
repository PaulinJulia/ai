import { useState } from "react";
import { FormData } from "../types/types";
import { useNavigate } from "react-router-dom";
import style from "./Form.module.css";

export const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    duration: 30,
    targetMuscle: "",
    fitnessLevel: "",
    goal: "",
    equipment: [] as string[],
  });

  const handleInputChange = (
    name: string,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generatePlan = async () => {
    navigate("/response", { state: { loading: true } });
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
      } else {
        const data = await response.json();
        navigate("/response", {
          state: { workout: data.savedConversation },
          replace: true,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error generating plan", error);
      }
    }
  };

  return (
    <div className={style["form-wrapper"]}>
      <div className={style["choices-wrapper-one"]}>
        {/* Duration Slider */}
        <div className={style["option-wrapper"]}>
          <label htmlFor="duration" className={style["label"]}>
            Träningstid (minuter):
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
          />
          <p>{formData.duration} minuter</p>
        </div>
        {/* Target Muscle Select */}
        <div className={style["option-wrapper"]}>
          <label htmlFor="targetMuscle" className={style["label"]}>
            Målmuskel:
          </label>
          <select
            id="targetMuscle"
            className={style["select"]}
            defaultValue=""
            onChange={(e) => handleInputChange("targetMuscle", e.target.value)}
          >
            <option value="" disabled>
              Välj muskelgrupp
            </option>
            <option value="Bröst">Bröst</option>
            <option value="Rygg">Rygg</option>
            <option value="Ben">Ben</option>
            <option value="Axlar">Axlar</option>
            <option value="Armar">Armar</option>
          </select>
        </div>
      </div>
      {/* Fitness Level Select */}
      <div className={style["choices-wrapper-two"]}>
        <div className={style["option-wrapper"]}>
          <label htmlFor="fitnessLevel" className={style["label"]}>
            Konditionsnivå:
          </label>
          <select
            id="fitnessLevel"
            className={style["select"]}
            defaultValue=""
            onChange={(e) => handleInputChange("fitnessLevel", e.target.value)}
          >
            <option value="" disabled>
              Välj din konditionsnivå
            </option>
            <option value="Nybörjare">Nybörjare</option>
            <option value="Medel">Medel</option>
            <option value="Avancerad">Avancerad</option>
          </select>
        </div>
        {/* Goal Select */}
        <div className={style["option-wrapper"]}>
          <label htmlFor="goal" className={style["label"]}>
            Träningsmål:
          </label>
          <select
            id="goal"
            className={style["select"]}
            defaultValue=""
            onChange={(e) => handleInputChange("goal", e.target.value)}
          >
            <option value="" disabled>
              Välj ditt träningsmål
            </option>
            <option value="Styrka">Styrka</option>
            <option value="Uthållighet">Uthållighet</option>
            <option value="Viktminskning">Viktminskning</option>
            <option value="Muskelökning">Muskelökning</option>
          </select>
        </div>
      </div>
      {/* Equipment Checkboxes */}
      <div>
        <p className={style["label"]}>Tillgänglig utrustning:</p>
        <div className={style["equipment"]}>
          {[
            "Hantlar",
            "Skivstång",
            "Träningsmaskin",
            "Gummiband",
            "Ingen utrustning",
          ].map((item) => (
            <div key={item}>
              <label>
                <input
                  type="checkbox"
                  className={style["checkbox"]}
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
                <span className={style["checkbox-options"]}>{item}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <button title="Skapa träningspass" onClick={generatePlan} className={style["create-workout-button"]}>
        Skapa träningspass
      </button>
    </div>
  );
};
