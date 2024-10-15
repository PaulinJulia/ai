import { Form } from "../components/Form"
import style from "./CreateWorkoutRoute.module.css"

const CreateWorkoutRoute = () => {
  return (
    <main>
      <h3 className={style["title"]}>Skapa ditt personliga träningspass:</h3>
      <Form />
    </main>
  );
};

export default CreateWorkoutRoute;
