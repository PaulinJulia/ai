import { Outlet, Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GiBodyBalance } from "react-icons/gi";
import style from "./RootRoute.module.css";

const RootRoute = () => {
  return (
    <>
      <header className={style["header"]}>
        <div className={style["top-link-wrapper"]}>
          <Link to="/" title="Home" className={style["title"]}>
            <GiBodyBalance />
            <p>BODY BALANCE</p>
          </Link>
        </div>
        <nav>
          <ul className={style["bottom-link-wrapper"]}>
            <li>
              <Link to="/createworkout" title="Skapa träningspass">
                Skapa träningspass
              </Link>
            </li>
            <li>
              <Link to="/plan" title="Träningsschema">
                Träningsschema
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div id="detail">
        <Outlet />
      </div>
      <footer>
        <ul className={style["social-media"]}>
          <li>
            <FaFacebookF />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaLinkedin />
          </li>
        </ul>
        <div className={style["contact"]}>
          <p>Om BODY BALANCE</p>
          <p>Kontakta oss</p>
        </div>
      </footer>
    </>
  );
};

export default RootRoute;
