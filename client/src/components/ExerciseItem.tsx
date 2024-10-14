import { ExerciseItemProps } from "../types/types";
import style from "./ExerciseItem.module.css";

export const ExerciseItem = ({ workout }: ExerciseItemProps) => {
  return (
    <>
      <ul className={style["exercise-wrapper"]}>
        {workout?.exercises.map((exercise, index) => (
          <li key={index} className={style["exercise-list"]}>
            <h5 className={style["exercise-name"]}>{exercise.name}</h5>
            <p className={style["explanation"]}>{exercise.explanation}</p>
            <div className={style["repetition"]}>
              <p>Set:</p>
              <p>{exercise.sets}</p>
              <p>Repetitioner:</p>
              <p>{exercise.repetitions}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
