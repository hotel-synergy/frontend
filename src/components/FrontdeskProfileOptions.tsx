import { useEffect, useState } from "react";
import profileOptionsStyle from "../styles/profileOptions.module.css";
import { useNavigate } from "react-router-dom";

function FrontdeskProfileOptions() {
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsRendered(true);
  }, []);
  return (
    <section
      className={`${profileOptionsStyle.container} ${
        isRendered ? profileOptionsStyle.animate : ""
      }`}
    >
      <div className={profileOptionsStyle.button}>
        <span className="material-symbols-outlined">account_circle</span>
        <span>My Account</span>
      </div>
      <div className={profileOptionsStyle.button}>
        <span className="material-symbols-outlined">lock</span>
        <span>Lock Screen</span>
      </div>
      <div className={profileOptionsStyle.button}>
        <span className="material-symbols-outlined">settings</span>
        <span>Settings</span>
      </div>
      <div
        onClick={() => navigate("/logout")}
        className={profileOptionsStyle.button}
      >
        <span className="material-symbols-outlined">logout</span>
        <span>Log out</span>
      </div>
    </section>
  );
}

export default FrontdeskProfileOptions;
