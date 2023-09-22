interface loginDetailsProps {
  email: string;
  password: string;
}

function useAuth() {
  const userLoader = () => {
    const localData = localStorage.getItem("hs_user");
    if (localData) {
      const extractedData = JSON.parse(localData);
      return { ok: true, data: extractedData };
    } else {
      return { ok: false };
    }
  };

  const getUser = () => {
    return userLoader();
  };
  const logout = async () => localStorage.clear();
  const login = async ({ email, password }: loginDetailsProps) => {
    try {
      const loginRequest = await fetch(
        import.meta.env.VITE_API_URL + "auth/login",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );
      if (loginRequest.status === 200) {
        const extractedData = await loginRequest.json();
        const userData = JSON.stringify(extractedData.user);
        localStorage.setItem("hs_user", userData);
        return { ok: true, msg: "User logged in successfully." };
      }
      if (loginRequest.status === 400) {
        const data = await loginRequest.json();
        return { ok: false, msg: data.msg };
      }
      if (loginRequest.status === 404) {
        return { ok: false, msg: "No user found with that email." };
      }
      if (loginRequest.status === 500) {
        return { ok: false, msg: "There was an unknown server error." };
      }
      if (!loginRequest.ok) {
        return { ok: false, msg: "Unknown error connecting to server." };
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { getUser, logout, login };
}

export default useAuth;
