import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
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

        <Route
          path="/frontdesk"
          element={
            <FrontdeskPage>
              <FrontdeskHome />
            </FrontdeskPage>
          }
        />
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/resetPassword" element={<NewPassword />} />
        <Route path="/auth/verifyEmail" element={<EmailVerification />} />
        <Route path="/auth/setup" element={<Setup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
