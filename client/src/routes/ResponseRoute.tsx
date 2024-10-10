import { useState, useEffect } from "react";
import { ExerciseItem } from "../components/ExerciseItem";
import { useLocation } from "react-router-dom";

const ResponseRoute = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const workout = location.state?.workout;

  useEffect(() => {
    if (!workout) {
      setError("Ingen träningsplan hittades.");
    }
    setLoading(false);
  }, [workout]);

  return (
    <main>
      {loading && <p>Laddar...</p>}
      {error && <p>Error: {error}</p>}
      <p>{workout.workout.wisdom}</p>
      <h3 className="font-semibold mb-2">Ditt nyligen skapade träningspass:</h3>
      <h4>{workout.workout.title || "Träningspass utan titel"}</h4>
      <p>Datum: {new Date(workout.createdAt).toLocaleDateString()}</p>
      <p>Varaktighet: {workout.duration} minuter</p>
      <p>Utrustning: {workout.equipment.join(", ")}</p>
      <p>Mål: {workout.goal}</p>
      <p>Muskelgrupp: {workout.muscleGroup}</p>

      <h5>Övningar:</h5>
      {workout.workout ? (
        <ExerciseItem workout={workout.workout} />
      ) : (
        <p>Inga övningar tillgängliga för detta pass.</p>
      )}
      <p> Råd: {workout.workout.advice}</p>
    </main>
  );
};

export default ResponseRoute;
