import { ExerciseItemProps } from "../types/types";

export const ExerciseItem = ({ workout }: ExerciseItemProps) => {

  
  return (
    <div>
      <ul>
        {workout?.exercises.map((exercise, index) => (
          <li key={index}>
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
