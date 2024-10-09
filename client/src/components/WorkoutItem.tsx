import { WorkoutItemProps } from "../types/types";

export const WorkoutItem = ({ workout }: WorkoutItemProps) => {
  return (
    <div>
      <h4>{workout.title}</h4>
      <p>Varaktighet: {workout.duration} minuter</p>
      <div>
        {workout.exercises.map((exercise) => (
          <div key={exercise.id}>
            <h5>{exercise.name}</h5>
            <p>{exercise.explanation}</p>
            <p>
              Set: {exercise.sets}, Repetitioner: {exercise.repetitions},
              Varaktighet: {exercise.duration} sekunder
            </p>
          </div>
        ))}
      </div>
      <p>{workout.advice}</p>
    </div>
  );
};
