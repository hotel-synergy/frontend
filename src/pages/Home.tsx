import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/AuthHook";

function Home() {
  const { getUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const currentUser = getUser();
    if (currentUser.ok) {
      return navigate(`/${currentUser.data.role}`);
    } else {
      return navigate("/auth/login");
    }
  });
  return <>Loading</>;
}

export default Home;
