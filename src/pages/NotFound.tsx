import { useNavigate } from "react-router-dom";
import Style from "../styles/unauthorized.module.css";

function NotFound() {
  const navigate = useNavigate();
  return (
    <section>
      <div className={Style.container}>
        <h1>Oh no.. 404</h1>
        <p>The thing you are looking for was not found.</p>
        <button onClick={() => navigate("/")} className={Style.button}>
          Homepage
        </button>
      </div>
    </section>
  );
}

export default NotFound;
