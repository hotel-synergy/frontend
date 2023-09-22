import { useEffect } from "react";
import useAuth from "../../hooks/AuthHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Style from "../../styles/unauthorized.module.css";

function Unauthorized() {
  const { getUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser.ok) {
      toast.warn("Please login to continue.");
      return navigate("/auth/login");
    }
  }, [getUser, navigate]);

  return (
    <section>
      <div className={Style.container}>
        <h1>Hum.. 401</h1>
        <p>You are not allowed to access this page.</p>
        <button onClick={() => navigate("/")} className={Style.button}>
          Homepage
        </button>
      </div>
    </section>
  );
}

export default Unauthorized;
