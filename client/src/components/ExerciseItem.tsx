import { ExerciseItemProps } from "../types/types";
import style from "./ExerciseItem.module.css"

export const ExerciseItem = ({ workout }: ExerciseItemProps) => {

  
  return (
    <div>
      <ul className={style["wrapper"]}>
        {workout?.exercises.map((exercise, index) => (
          <li key={index} className={style["exercise-list"]}>
            <h5>{exercise.name}</h5>
            <p>{exercise.explanation}</p>
            <p>
              Set: {exercise.sets}, Repetitioner: {exercise.repetitions},
              Varaktighet: {exercise.duration} sekunder
            </p>
          </li>
        ))}
      </ul>
      <p>Råd:{workout.advice}</p>
    </div>
  );
};
