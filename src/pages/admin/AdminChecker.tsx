import { useState, useEffect } from "react";
import useAuth from "../../hooks/AuthHook";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import AdminSidebar from "./AdminSidebar";
import AdminLayoutStyle from "../../styles/adminlayout.module.css";

function AdminPage({ children }: React.PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getUser } = useAuth();
  useEffect(() => {
    const user = getUser();
    if (user.ok && user.data.role === "admin") {
      setLoading(false);
    } else {
      return navigate("/unauthorized");
    }
  }, [navigate, getUser]);

  switch (loading) {
    case true:
      return <Loading />;

    default:
      return (
        <>
          <section className={AdminLayoutStyle.main}>
            <aside className={AdminLayoutStyle.sidebar}>
              <AdminSidebar />
            </aside>
            <>{children}</>
          </section>
        </>
      );
  }
}

export default AdminPage;
