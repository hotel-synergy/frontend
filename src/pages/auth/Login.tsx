import "../../styles/Login.css";
import DefaultUser from "../../res/default_user.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/AuthHook";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { getUser } = useAuth();

  useEffect(() => {
    window.document.title = "Login - Hotel Synergy";
    const currentUser = getUser();
    if (currentUser.ok) {
      return navigate(`/${currentUser.data.role}`);
    }
  }, [getUser, navigate]);

  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    const loginStatus = await login(userDetails);
    if (!loginStatus?.ok) {
      toast.error(loginStatus?.msg);
    } else {
      toast.success(loginStatus.msg);
      return navigate("/admin");
    }
    setLoading(false);
  };
  return (
    <section className="form-wrapper">
      {loading && <Loading />}
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <img src={DefaultUser} id="logo" alt="Hotel Synergy Logo" />
        <h1>Login to Your Account</h1>
        <p>Please provide your credentials to continue</p>
        <input
          type="email"
          value={userDetails.email}
          id="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setUserDetails({ ...userDetails, email: e.target.value });
          }}
        />
        <input
          type="password"
          value={userDetails.password}
          required
          onChange={(e) => {
            setUserDetails({ ...userDetails, password: e.target.value });
          }}
          id="password"
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
        <p>
          Forgot your login password?{" "}
          <a
            className="link_text"
            href="/auth/reset"
            onClick={(e) => {
              e.preventDefault();
              navigate("/auth/reset");
            }}
          >
            Reset
          </a>
        </p>
      </form>
    </section>
  );
}

export default Login;
