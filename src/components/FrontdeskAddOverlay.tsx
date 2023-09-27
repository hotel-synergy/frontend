import React, { useRef, Dispatch, SetStateAction } from "react";
import FrontDeskAddStyle from "../styles/frondeskadd.module.css";

interface FrontdeskAddOverlayProps {
  setOverlay: Dispatch<SetStateAction<boolean>>;
}

function FrontdeskAddOverlay({ setOverlay }: FrontdeskAddOverlayProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleContainerClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setOverlay(false);
    }
  };

  return (
    <section
      className={FrontDeskAddStyle.overlay}
      onClick={handleContainerClick}
    >
      <div className={FrontDeskAddStyle.container} ref={containerRef}>
        <h1>Quick Actions</h1>
        <p>What are you looking to do, quickly?</p>
        <section className={FrontDeskAddStyle.listView}>
          <div className={FrontDeskAddStyle.addItem}>
            <span className="material-symbols-outlined">room_service</span>
            <div>
              <h1>Restaurant Order</h1>
              <p>Sample option to add</p>
            </div>
          </div>
          <div className={FrontDeskAddStyle.addItem}>
            <span className="material-symbols-outlined">bed</span>
            <div>
              <h1>Order from room</h1>
              <p>Sample option to add</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default FrontdeskAddOverlay;
