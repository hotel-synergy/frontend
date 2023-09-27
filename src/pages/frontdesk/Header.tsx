import { useNavigate } from "react-router-dom";
import DefaulUser from "../../res/default_user.png";
import { Dispatch, SetStateAction } from "react";

interface frontdeskHeaderProps {
  showSidebar: Dispatch<SetStateAction<boolean>>;
  showOverlay: Dispatch<SetStateAction<boolean>>;
  showProfileOptions: Dispatch<SetStateAction<boolean>>;
}

function FrontDeskHeader({
  showSidebar,
  showOverlay,
  showProfileOptions,
}: frontdeskHeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button
          onClick={() => {
            showSidebar((prev) => !prev);
            const data = localStorage.getItem("ui_sidebar");
            if (data === "hide") {
              localStorage.setItem("ui_sidebar", "show");
            } else {
              localStorage.setItem("ui_sidebar", "hide");
            }
          }}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <button onClick={() => navigate("/")}>
          <span className="material-symbols-outlined">home</span>
        </button>
        <h1>Hotel Synergy</h1>
      </div>
      <div>
        <button onClick={() => showOverlay((prevstate) => !prevstate)}>
          <span className="material-symbols-outlined">add</span>
        </button>
        <img
          onClick={() => {
            showProfileOptions((prevState) => !prevState);
          }}
          src={DefaulUser}
          alt="User Image"
          id="profile"
        />
      </div>
    </>
  );
}

export default FrontDeskHeader;
