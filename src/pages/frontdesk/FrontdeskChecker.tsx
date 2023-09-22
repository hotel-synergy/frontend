import { useState, useEffect } from "react";
import useAuth from "../../hooks/AuthHook";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

function FrontdeskPage({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getUser } = useAuth();
  useEffect(() => {
    const user = getUser();
    if (user.ok && user.data.role === "frontdesk") {
      setLoading(false);
    } else {
      return navigate("/unauthorized");
    }
  }, [navigate, getUser]);
  switch (loading) {
    case true:
      return <Loading />;

    default:
      return <>{children}</>;
  }
}

export default FrontdeskPage;
