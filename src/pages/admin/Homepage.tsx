import { useEffect } from "react";

function AdminHomepage() {
  useEffect(() => {
    window.document.title = "Dashboard - Hotel Synergy";
  });
  return <div>AdminHomepage</div>;
}

export default AdminHomepage;
