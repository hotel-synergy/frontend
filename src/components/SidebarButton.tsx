import "../styles/google_icons.css";
import ButtonStyle from "../styles/sidebarbutton.module.css";
interface sidebarbuttonProps {
  currentMenu: string;
  text: string;
  action: () => void;
  icon: string;
}

function SidebarButton({
  currentMenu,
  text,
  action,
  icon,
}: sidebarbuttonProps) {
  return (
    <button
      onClick={action}
      className={
        currentMenu.toLowerCase() === text.toLowerCase()
          ? ButtonStyle.active
          : ButtonStyle.inactive
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span>{text}</span>
    </button>
  );
}

export default SidebarButton;
