import { ExerciseItemProps } from "../types/types";

export const ExerciseItem = ({ workout }: ExerciseItemProps) => {
  return (
    <div>
      <h4>{workout.title}</h4>
      <ul>
        {workout.exercises.map((exercise) => (
          <li key={workout.id}>
            <h5>{exercise.name}</h5>
            <p>{exercise.explanation}</p>
            <p>
              Set: {exercise.sets}, Repetitioner: {exercise.repetitions},
              Varaktighet: {exercise.duration} sekunder
            </p>
          </li>
        ))}
      </ul>
      <p>{workout.advice}</p>
    </div>
  );
};
