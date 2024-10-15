import { useEffect } from "react";
import { ExerciseItem } from "../components/ExerciseItem";
import { useLocation, Link, useNavigate } from "react-router-dom";
import style from "./WorkoutsRoute.module.css";
import creatures from "../assets/creatures.gif";

const ResponseRoute = () => {
  //   const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const { workout, loading } = location.state || {
    workout: null,
    loading: true,
  };

  useEffect(() => {
    if (!workout) {
      //   setError("Ingen träningsplan hittades.");
    }
  }, [workout]);

  const savePlan = () => {
    navigate("/workout", { state: { loading: true } });
    //TO DO: Spara mot databasen
  };

  const regeneratePlan = async () => {
    navigate("/response", { state: { loading: true } });
    try {
      const response = await fetch(`http://localhost:4000/api/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: {
            muscleGroup: workout.muscleGroup,
            duration: workout.duration,
            fitnessLevel: workout.fitnessLevel,
            equipment: workout.equipment,
            goal: workout.goal,
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
    <main>
      {loading ? (
        <div className={style["loader"]}>
          <img src={creatures} alt="Loading..." />
        </div>
      ) : (
        <div className={style["container"]}>
          <h3 className={style["title"]}>Ditt unika träningspass:</h3>
          <div className={style["training-list"]}>
            <p className={style["word-of-wisdom"]}>{workout.workout.wisdom}</p>
            <h4 className={style["workout-title"]}>{workout.workout.title}</h4>
            <div className={style["info-container"]}>
              <div className={style["info-wrapper-one"]}>
                <div>
                  Datum:{" "}
                  <p className={style["information"]}>
                    {new Date(workout.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  Varaktighet:{" "}
                  <p className={style["information"]}>
                    {workout.duration} minuter
                  </p>
                </div>
                <div>
                  Utrustning:{" "}
                  <p className={style["information"]}>
                    {workout.equipment.join(", ")}
                  </p>
                </div>
              </div>
              <div className={style["info-wrapper-two"]}>
                <div>
                  Fitnessnivå:{" "}
                  <p className={style["information"]}>{workout.fitnessLevel}</p>
                </div>
                <div>
                  Mål: <p className={style["information"]}>{workout.goal}</p>
                </div>
                <div>
                  Muskelgrupp:{" "}
                  <p className={style["information"]}>{workout.muscleGroup}</p>
                </div>
              </div>
            </div>
            <div className={style["exercise-title"]}>
              Uppvärmning:
              <p className={style["warm-up"]}>{workout.workout?.warmUp}</p>
            </div>
            {workout.workout ? (
              <ExerciseItem workout={workout.workout} />
            ) : (
              <p>Inga övningar tillgängliga för detta pass.</p>
            )}
            <div className={style["exercise-title"]}>
              Nedvarvning:
              <p className={style["cool-down"]}>{workout.workout?.coolDown}</p>
            </div>
            <div className={style["buttons"]}>
              <button title="Tillbaka" className={style["back-button"]}>
                <Link to="/createworkout">Tillbaka</Link>
              </button>
              <button
                title="Spara"
                className={style["save-button"]}
                onClick={savePlan}
              >
                Spara
              </button>
              <button
                title="Få nytt förslag"
                className={style["regenerate-button"]}
                onClick={regeneratePlan}
              >
                Få nytt förslag
              </button>
            </div>
            <p className={style["advice"]}>Tips! {workout.workout?.advice}</p>
          </div>
        </div>
      )}
      {/* {error && <p>Error: {error}</p>} */}
    </main>
  );
};

export default ResponseRoute;
