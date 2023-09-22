import "../../styles/reset.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/AuthHook";
function NewPassword() {
  const { getUser } = useAuth();
  const urlSearch = new URLSearchParams(document.location.search);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [token] = useState(() => urlSearch.get("token"));
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser.ok) {
      return navigate(`/${currentUser.data.role}`);
    }
  }, [getUser, navigate]);

  const handlePasswordChange = async () => {
    const changePasswordRequest = await fetch(
      import.meta.env.VITE_API_URL + "auth/reset",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ token, newPassword: newPassword.password }),
      }
    );
    if (changePasswordRequest.status === 200) {
      setLoading(false);
      toast.success("Your password has been changed successfully.");
      return navigate("/auth/login");
    }
    if (changePasswordRequest.status === 401) {
      const data = await changePasswordRequest.json();
      toast.error(data.msg);
      setLoading(false);
      return navigate("/auth/login");
    }
    if (changePasswordRequest.status === 404) {
      toast.error("User directed by that token was not found.");
      return setLoading(false);
    }
    if (!changePasswordRequest.ok) {
      toast.error("There was an error changing password");
      return setLoading(false);
    }
  };
  useEffect(() => {
    window.document.title = "Reset Password - Hotel Synergy";
  }, []);
  return (
    <section>
      {loading && <Loading />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!token) {
            return toast.error("Password reset token is missing.");
          }
          if (newPassword.password.length < 6) {
            return toast.error("Password must be minimum 6 characters.");
          }
          if (newPassword.password === newPassword.confirmPassword) {
            setLoading(true);
            return handlePasswordChange();
          } else {
            return toast.error("Password confirmation don't match");
          }
        }}
        className="reset-form"
      >
        <h1>Choose New Password</h1>
        <p>Please enter a new password to set</p>
        <input
          id="password"
          type="password"
          placeholder="New password"
          autoComplete="new-password"
          value={newPassword.password}
          required
          onChange={(e) =>
            setNewPassword({ ...newPassword, password: e.target.value })
          }
        />

        <input
          value={newPassword.confirmPassword}
          id="confirm-password"
          type="password"
          required
          placeholder="Confirm password"
          onChange={(e) =>
            setNewPassword({ ...newPassword, confirmPassword: e.target.value })
          }
        />

        <button>Change password</button>
      </form>
    </section>
  );
}

export default NewPassword;
