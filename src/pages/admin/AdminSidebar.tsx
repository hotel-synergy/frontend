import { useState, useEffect } from "react";
import SidebarButton from "../../components/SidebarButton";
import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const [activeButton, setActiveButton] = useState("Home");
  const path = document.location.pathname;
  const navigate = useNavigate();
  useEffect(() => {
    setActiveButton(path.toString().replace("/", ""));
  }, [activeButton, path]);
  return (
    <>
      <h1>Hotel Synergy</h1>
      <SidebarButton
        action={() => {
          navigate("/admin");
        }}
        text="Home"
        currentMenu={activeButton === "admin" ? "Home" : activeButton}
        icon="Home"
      />
      <SidebarButton
        action={() => {
          navigate("/rooms");
        }}
        text="Rooms"
        currentMenu={activeButton}
        icon="bed"
      />
      <SidebarButton
        action={() => {
          navigate("/tables");
        }}
        text="Tables"
        currentMenu={activeButton}
        icon="table_bar"
      />
      <SidebarButton
        action={() => {
          navigate("/company");
        }}
        text="Company"
        currentMenu={activeButton}
        icon="store"
      />
      <SidebarButton
        action={() => {
          navigate("/logout");
        }}
        text="Log out"
        currentMenu={activeButton}
        icon="logout"
      />
    </>
  );
}

export default AdminSidebar;
