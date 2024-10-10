import { useEffect, useState } from "react";
import { Plan } from "../types/types";
import axios from "axios";
import { ExerciseItem } from "../components/ExerciseItem";

const WorkoutsRoute = () => {
  const [trainingSessions, setTrainingSessions] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainingSessions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data");
        setTrainingSessions(response.data); // Axios omvandlar JSON automatiskt
        console.log(response.data);
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
      <h3 className="font-semibold mb-2">Dina träningspass:</h3>
      {loading && <p>Laddar...</p>}
      {error && <p>Error: {error}</p>}
      <ul style={{ listStyleType: "none" }}>
        {trainingSessions.map((session) => (
          <li key={session.id} className="training-list">
            <h4>{session.workout?.title || "Träningspass utan titel"}</h4>
            <p>Datum: {new Date(session.createdAt).toLocaleDateString()}</p>
            <p>Varaktighet: {session.duration} minuter</p>
            <p>Utrustning: {session.equipment.join(", ")}</p>
            <p>Fitnessnivå: {session.fitnessLevel}</p>
            <p>Mål: {session.goal}</p>
            <p>Muskelgrupp: {session.muscleGroup}</p>

            <h5>Övningar:</h5>
            {session.workout ? (
              <ExerciseItem workout={session.workout} />
            ) : (
              <p>Inga övningar tillgängliga för detta pass.</p>
            )}
            <p> Råd: {session.workout?.advice}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default WorkoutsRoute;
