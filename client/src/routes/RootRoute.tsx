import { Outlet, Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GiBodyBalance } from "react-icons/gi";
import style from "./RootRoute.module.css";

const RootRoute = () => {
  return (
    <>
      <header className={style["header"]}>
        <div className={style["home-link-wrapper"]}>
          <Link to="/" title="Home" className={style["title"]}>
            <GiBodyBalance />
            <p>BODY BALANCE</p>
          </Link>
        </div>
        <nav>
          <ul className={style["link-wrapper"]}>
            <li>
              <Link to="/createworkout" title="Skapa träningspass">
                Skapa träningspass
              </Link>
            </li>
            <li>
              <Link to="/workout" title="Träningsschema">
                Träningsschema
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div id="detail">
        <Outlet />
      </div>
      <footer className={style["footer"]}>
        <div className={style["contact"]}>
          <p title="Om Body Balance">Om BODY BALANCE</p>
          <p title="Kontakta oss">Kontakta oss</p>
        </div>
        <ul className={style["social-media"]}>
          <li>
            <FaFacebookF title="Facebook" />
          </li>
          <li>
            <FaInstagram title="Instagram" />
          </li>
          <li>
            <FaLinkedin title="LinkedIn" />
          </li>
        </ul>
      </footer>
    </>
  );
};

export default RootRoute;
