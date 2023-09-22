import { useEffect, useState } from "react";
import "../../styles/reset.css";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Reset password - Hotel Synergy";
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleForm = async () => {
    setLoading(true);
    const resetEmailRequest = await fetch(
      import.meta.env.VITE_API_URL + "auth/reset",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    setLoading(false);

    if (resetEmailRequest.status === 200) {
      return toast.success("Link sent, please check your email to continue.");
    }
    if (resetEmailRequest.status === 400) {
      const data = await resetEmailRequest.json();
      return toast.error(data.msg);
    }
    if (resetEmailRequest.status === 404) {
      return toast.error("No user with that email found.");
    }
    if (resetEmailRequest.status === 500) {
      return toast.error(
        "There was an unknown server error sending reset link."
      );
    }
  };

  return (
    <section>
      {loading && <Loading />}
      <form
        className="reset-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleForm();
        }}
      >
        <h1>Reset Your Password</h1>
        <p>Please provide your email to reset password</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          placeholder="Email"
        />
        <button type="submit">Send Password Reset Link</button>
        <p className="base-text">
          Remember your password?{" "}
          <a
            href="/auth/login"
            onClick={(e) => {
              e.preventDefault();
              navigate("/auth/login");
            }}
          >
            Login
          </a>
        </p>
      </form>
    </section>
  );
}

export default ResetPassword;
