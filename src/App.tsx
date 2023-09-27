import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPage from "./pages/admin/AdminChecker";
import AdminHomepage from "./pages/admin/Homepage";
import FrontdeskPage from "./pages/frontdesk/FrontdeskChecker";
import FrontdeskHome from "./pages/frontdesk/Homepage";
import NewPassword from "./pages/auth/NewPassword";
import EmailVerification from "./pages/auth/EmailVerification";
import Unauthorized from "./pages/auth/Unauthorized";
import NotFound from "./pages/NotFound";
import AdminCompany from "./pages/admin/Company";
import AdminTables from "./pages/admin/Tables";
import AdminRoom from "./pages/admin/Rooms";
import Logout from "./pages/auth/Logout";
import Setup from "./pages/auth/Setup";
import Orders from "./pages/frontdesk/Orders";
import RestaurantMenu from "./pages/frontdesk/RestaurantMenu";
import Tables from "./pages/frontdesk/Tables";
import Rooms from "./pages/frontdesk/Rooms";
import Inventory from "./pages/frontdesk/Inventory";
import Settings from "./pages/frontdesk/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminPage>
              <AdminHomepage />
            </AdminPage>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/rooms"
          element={
            <AdminPage>
              <AdminRoom />
            </AdminPage>
          }
        />
        <Route
          path="/tables"
          element={
            <AdminPage>
              <AdminTables />
            </AdminPage>
          }
        />
        <Route
          path="/company"
          element={
            <AdminPage>
              <AdminCompany />
            </AdminPage>
          }
        />
        {/* Front desk paths */}
        <Route
          path="/frontdesk"
          element={<Navigate to={"/frontdesk/dashboard"} replace />}
        />
        <Route
          path="/frontdesk/dashboard"
          element={
            <FrontdeskPage>
              <FrontdeskHome />
            </FrontdeskPage>
          }
        />
        <Route
          path="/frontdesk/orders"
          element={
            <FrontdeskPage>
              <Orders />
            </FrontdeskPage>
          }
        />

        <Route
          path="/frontdesk/menu"
          element={
            <FrontdeskPage>
              <RestaurantMenu />
            </FrontdeskPage>
          }
        />

        <Route
          path="/frontdesk/tables"
          element={
            <FrontdeskPage>
              <Tables />
            </FrontdeskPage>
          }
        />

        <Route
          path="/frontdesk/rooms"
          element={
            <FrontdeskPage>
              <Rooms />
            </FrontdeskPage>
          }
        />
        <Route
          path="/frontdesk/inventory"
          element={
            <FrontdeskPage>
              <Inventory />
            </FrontdeskPage>
          }
        />
        <Route
          path="/frontdesk/settings"
          element={
            <FrontdeskPage>
              <Settings />
            </FrontdeskPage>
          }
        />

        {/* auth paths */}
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/resetPassword" element={<NewPassword />} />
        <Route path="/auth/verifyEmail" element={<EmailVerification />} />
        <Route path="/auth/setup" element={<Setup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
