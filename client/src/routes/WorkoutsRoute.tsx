import { useEffect, useState } from "react";
import { Plan } from "../types/types";
import axios from "axios";
import { ExerciseItem } from "../components/ExerciseItem";
import style from "./WorkoutsRoute.module.css";
import { MdDelete, MdFavoriteBorder } from "react-icons/md";

const WorkoutsRoute = () => {
  const [trainingSessions, setTrainingSessions] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingSessions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data");

        setTrainingSessions(response.data.reverse()); // Axios omvandlar JSON automatiskt
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
      <h3 className={style["title"]}>Dina träningspass:</h3>
      {loading && <p>Laddar...</p>}
      {error && <p>Error: {error}</p>}
      <div className={style["container"]}>
        <ul>
          {trainingSessions.map((session, index) => (
            <li key={index} className={style["training-list"]}>
              <p className={style["word-of-wisdom"]}>
                {session.workout?.wisdom}
              </p>
              <div className={style["title-wrapper"]}>
                <h4 className={style["workout-title"]}>
                  {session.workout?.title}
                </h4>
                <div className={style["favortie-delete-icon-wrapper"]}>
                  <MdFavoriteBorder
                    title="Favorit"
                    className={style["favortie-icon"]}
                  />
                  <MdDelete
                    title="Ta bort"
                    className={style["delete-icon"]}
                  />
                </div>
              </div>
              <div className={style["info-container"]}>
                <div className={style["info-wrapper-one"]}>
                  <div>
                    Datum:{" "}
                    <p className={style["information"]}>
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    Varaktighet:{" "}
                    <p className={style["information"]}>
                      {session.duration} minuter
                    </p>
                  </div>
                  <div>
                    Utrustning:{" "}
                    <p className={style["information"]}>
                      {session.equipment.join(", ")}
                    </p>
                  </div>
                </div>
                <div className={style["info-wrapper-two"]}>
                  <div>
                    Fitnessnivå:{" "}
                    <p className={style["information"]}>
                      {session.fitnessLevel}
                    </p>
                  </div>
                  <div>
                    Mål: <p className={style["information"]}>{session.goal}</p>
                  </div>
                  <div>
                    Muskelgrupp:{" "}
                    <p className={style["information"]}>
                      {session.muscleGroup}
                    </p>
                  </div>
                </div>
              </div>
              <div className={style["exercise-title"]}>
                Uppvärmning:
                <p className={style["warm-up"]}>{session.workout?.warmUp}</p>
              </div>
              {session.workout ? (
                <ExerciseItem workout={session.workout} />
              ) : (
                <p>Inga övningar tillgängliga för detta pass.</p>
              )}
              <div className={style["exercise-title"]}>
                Nedvarvning:
                <p className={style["cool-down"]}>
                  {session.workout?.coolDown}
                </p>
              </div>
              <p className={style["advice"]}>Tips! {session.workout?.advice}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WorkoutsRoute;
