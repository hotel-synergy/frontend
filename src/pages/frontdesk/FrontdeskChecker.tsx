import { useState, useEffect } from "react";
import useAuth from "../../hooks/AuthHook";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import FrontDeskHeader from "./Header";
import FrontDeskSidebar from "./Sidebar";
import FrontDeskStyle from "../../styles/frontdesklayout.module.css";
import FrontdeskAddOverlay from "../../components/FrontdeskAddOverlay";
import FrontdeskProfileOptions from "../../components/FrontdeskProfileOptions";

function FrontdeskPage({ children }: React.PropsWithChildren) {
  window.document.title = "Front desk - Hotel Synergy";
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showAddOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  const { getUser } = useAuth();
  useEffect(() => {
    const user = getUser();
    if (user.ok && user.data.role === "frontdesk") {
      //TODO: load the frontdesk data and then set loading to false
      setLoading(false);
    } else {
      return navigate("/unauthorized");
    }
  }, [navigate, getUser]);

  useEffect(() => {
    const sidebar_data = localStorage.getItem("ui_sidebar");
    if (sidebar_data === "hide") {
      setShowSidebar(false);
    } else setShowSidebar(true);
  });
  switch (loading) {
    case true:
      return <Loading />;

    default:
      return (
        <>
          <section className={FrontDeskStyle.header}>
            {showAddOverlay && (
              <FrontdeskAddOverlay setOverlay={setShowOverlay} />
            )}
            <FrontDeskHeader
              showProfileOptions={setShowProfileOptions}
              showOverlay={setShowOverlay}
              showSidebar={setShowSidebar}
            />
          </section>
          <main className={FrontDeskStyle.main}>
            {showSidebar && (
              <section className={FrontDeskStyle.sidebar}>
                <FrontDeskSidebar />
              </section>
            )}
            <section className={FrontDeskStyle.content}>
              {showProfileOptions && <FrontdeskProfileOptions />}
              {children}
            </section>
          </main>
        </>
      );
  }
}

export default FrontdeskPage;
