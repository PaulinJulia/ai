import { useEffect, useState } from "react";
import { Plan } from "../types/types";
import axios from "axios";
import { ExerciseItem } from "../components/ExerciseItem";
import style from "./WorkoutsRoute.module.css";

const WorkoutsRoute = () => {
  const [trainingSessions, setTrainingSessions] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingSessions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data");
        setTrainingSessions(response.data); // Axios omvandlar JSON automatiskt
        // console.log(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTrainingSessions();
  }, []);

  return (
    <main>
      <div className={style["container"]}>
        <h3 className={style["title"]}>Dina träningspass:</h3>
        {loading && <p>Laddar...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {trainingSessions.map((session, index) => (
            <li key={index} className={style["training-list"]}>
              <div className={style["word-of-wisdom"]}>
                {session.workout?.wisdom}
              </div>
              <h4 className={style["workout-title"]}>
                {session.workout?.title}
              </h4>
              <div className={style["info-container"]}>
                <div className={style["info-wrapper-one"]}>
                  <p>
                    Datum:{" "}
                    <p className={style["information"]}>
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </p>
                  <p>
                    Varaktighet:{" "}
                    <p className={style["information"]}>
                      {session.duration} minuter
                    </p>
                  </p>
                  <p>
                    Utrustning:{" "}
                    <p className={style["information"]}>
                      {session.equipment.join(", ")}
                    </p>
                  </p>
                </div>
                <div className={style["info-wrapper-two"]}>
                  <p>
                    Fitnessnivå:{" "}
                    <p className={style["information"]}>
                      {session.fitnessLevel}
                    </p>
                  </p>
                  <p>
                    Mål: <p className={style["information"]}>{session.goal}</p>
                  </p>
                  <p>
                    Muskelgrupp:{" "}
                    <p className={style["information"]}>
                      {session.muscleGroup}
                    </p>
                  </p>
                </div>
              </div>
              <p className={style["exercise-title"]}>
                Uppvärmning:
                <p className={style["warm-up"]}>{session.workout?.warmUp}</p>
              </p>
              {session.workout ? (
                <ExerciseItem workout={session.workout} />
              ) : (
                <p>Inga övningar tillgängliga för detta pass.</p>
              )}
              <p className={style["exercise-title"]}>
                Nedvarvning:
                <p className={style["cool-down"]}>
                  {session.workout?.coolDown}
                </p>
              </p>
              <p className={style["advice"]}>Tips! {session.workout?.advice}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WorkoutsRoute;
