import { Link } from "react-router-dom";
import style from "./HomeRoute.module.css";

const HomeRoute = () => {
  return (
    <main>
      <div className={style["wrapper"]}>
        <div className={style["container"]}>
          <h2 className={style["training-planner"]}>Träningsplanerare</h2>
          <p className={style["small-description"]}>
            Personliga träningspass med AI.
          </p>
          <p className={style["description"]}>
            Få skräddarsydda och inspirerande träningspass. Med hjälp av AI
            skapar vi unika träningsförslag som anpassas efter din nivå, mål och
            preferenser oavsett om du vill bygga muskler, förbättra din
            kondition eller bara hålla dig i form. Slipp gissa vad du ska träna
            och låt träningscoachen guida dig. Allt du behöver göra är att välja
            hur du vill träna, vi tar hand om resten!
          </p>
          <button title="Skapa träningspass" className={style["create-workout-button"]}>
            <Link to="/createworkout">Skapa träningspass</Link>
          </button>
          <p className={style["description"]}>
            Maximera din träning på ett smartare och mer effektivt sätt, varje
            gång.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomeRoute;
