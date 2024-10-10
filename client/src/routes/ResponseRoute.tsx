import { useState } from "react";
import { Plan } from "../types/types";
import { ExerciseItem } from "../components/ExerciseItem";

const ResponseRoute = () => {
  const [trainingSessions, setTrainingSessions] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <main>
      <h3 className="font-semibold mb-2">Ditt nyligen skapade träningspass:</h3>
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

export default ResponseRoute;
