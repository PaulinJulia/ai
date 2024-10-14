import { useEffect } from "react";
import { ExerciseItem } from "../components/ExerciseItem";
import { useLocation, Link } from "react-router-dom";
import style from "./WorkoutsRoute.module.css";

const ResponseRoute = () => {
  //   const [error, setError] = useState<string | null>(null);

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

  return (
    <main>
      <div className={style["container"]}>
        <h3 className={style["title"]}>Ditt nyligen skapade träningspass:</h3>
        {loading ? (
          <p>Laddar...</p>
        ) : (
          <div className={style["training-list"]}>
            <p className={style["word-of-wisdom"]}>{workout.workout.wisdom}</p>
            <h4 className={style["workout-title"]}>{workout.workout.title}</h4>
            <div className={style["info-container"]}>
              <div className={style["info-wrapper-one"]}>
                <p>
                  Datum:{" "}
                  <p className={style["information"]}>
                    {new Date(workout.createdAt).toLocaleDateString()}
                  </p>
                </p>
                <p>
                  Varaktighet:{" "}
                  <p className={style["information"]}>
                    {workout.duration} minuter
                  </p>
                </p>
                <p>
                  Utrustning:{" "}
                  <p className={style["information"]}>
                    {workout.equipment.join(", ")}
                  </p>
                </p>
              </div>
              <div className={style["info-wrapper-two"]}>
                <p>
                  Fitnessnivå:{" "}
                  <p className={style["information"]}>{workout.fitnessLevel}</p>
                </p>
                <p>
                  Mål: <p className={style["information"]}>{workout.goal}</p>
                </p>
                <p>
                  Muskelgrupp:{" "}
                  <p className={style["information"]}>{workout.muscleGroup}</p>
                </p>
              </div>
            </div>
            <p className={style["exercise-title"]}>
              Uppvärmning:
              <p className={style["warm-up"]}>{workout.workout?.warmUp}</p>
            </p>
            {workout.workout ? (
              <ExerciseItem workout={workout.workout} />
            ) : (
              <p>Inga övningar tillgängliga för detta pass.</p>
            )}
            <p className={style["exercise-title"]}>
              Nedvarvning:
              <p className={style["cool-down"]}>{workout.workout?.coolDown}</p>
            </p>
            <div className={style["buttons"]}>
              <button title="Ta bort" className={style["remove-button"]}>
                <Link to="/">Ta bort</Link>
              </button>
              <button title="Spara" className={style["save-button"]}>
                <Link to="/workout">Spara</Link>
              </button>
              <button
                title="Dina träningsscheman"
                className={style["workout-button"]}
              >
                <Link to="/workout">Dina träningsscheman</Link>
              </button>
            </div>
            <p className={style["advice"]}>Tips! {workout.workout?.advice}</p>
          </div>
        )}
        {/* {error && <p>Error: {error}</p>} */}
      </div>
    </main>
  );
};

export default ResponseRoute;
