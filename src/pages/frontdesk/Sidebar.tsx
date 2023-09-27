import { useEffect, useState } from "react";
import ForntDeskSidebarStyle from "../../styles/frontdesksidebar.module.css";
import { useNavigate } from "react-router-dom";

function FrontDeskSidebar() {
  const [currentMenu, setCurrentMenu] = useState(location.pathname);
  const navigate = useNavigate();
  const menu = [
    {
      name: "Dashboard",
      icon: "dashboard",
    },
    {
      name: "Orders",
      icon: "soup_kitchen",
    },
    {
      name: "Menu",
      icon: "restaurant_menu",
    },
    {
      name: "Tables",
      icon: "table_bar",
    },
    {
      name: "Rooms",
      icon: "bed",
    },
    {
      name: "Inventory",
      icon: "add_business",
    },
    {
      name: "Settings",
      icon: "settings",
    },
  ];

  useEffect(() => {
    if (currentMenu != location.pathname) {
      navigate(currentMenu.toLowerCase());
    }
    // setCurrentMenu(location.pathname);
  }, [currentMenu]);

  useEffect(() => {}, []);

  return (
    <section className={ForntDeskSidebarStyle.section}>
      {menu.map((menu) => {
        return (
          <button
            onClick={() => {
              setCurrentMenu(`/frontdesk/${menu.name.toLowerCase()}`);
            }}
            className={
              `/frontdesk/${menu.name.toLocaleLowerCase()}` ===
              currentMenu.toLocaleLowerCase()
                ? `${ForntDeskSidebarStyle.button} ${ForntDeskSidebarStyle.active}`
                : `${ForntDeskSidebarStyle.button}`
            }
          >
            <span className="material-symbols-outlined">{menu.icon}</span>
            <span>{menu.name}</span>
          </button>
        );
      })}
    </section>
  );
}

export default FrontDeskSidebar;
