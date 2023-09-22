import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Style from "../../styles/Logout.module.css";
import useAuth from "../../hooks/AuthHook";
function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <section>
      <div className={Style.container}>
        <h1 className={Style.title}>Wait...</h1>
        <p className={Style.description}>
          Are you sure that you want to log out?
        </p>
        <div className={Style.btn_holder}>
          <button onClick={() => navigate("/")} className={Style.btn_cancel}>
            Cancle
          </button>
          <button
            onClick={async () => {
              await logout();
              toast.success("User logged out successfully.");
              navigate("/auth/login");
            }}
            className={Style.btn_logout}
          >
            Log out
          </button>
        </div>
      </div>
    </section>
  );
}

export default Logout;
