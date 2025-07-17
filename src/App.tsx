import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";

import CribsPage from "@/pages/cribs/CribsPage";
import ProfileUsernamePage from "@/pages/profile/username/ProfileUsernamePage";
import ProtectedRoute from "@/components/route/ProtectedRoute";
import ReverseProtectedRoute from "@/components/route/ReverseProtectedRoute";
import LoginPage from "@/pages/login/LoginPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SupportPage from "./pages/support/SupportPage";
import Post from "@/pages/profile/post/Post";
import IndividualPage from "./pages/cribs/individual/IndividualPage";
import SettingsPage from "./pages/settings/SettingsPage";
import General from "./pages/settings/general/General";
import Notifications from "./pages/settings/notifications/Notifications";
import Account from "./pages/settings/account/Account";
import EditProfile from "./pages/profile/edit/EditProfile";
import AdminDraftCribsPage from "./pages/admin/AdminDraftCribsPage";
import AdminDraftIndividualCribPage from "./pages/admin/AdminDraftIndividualCribPage";
import AdminDraftThumbnailPage from "./pages/admin/AdminDraftThumbnailPage";

function App() {
  return (
    // Default font is Roboto Mono
    <div className="font-['Roboto_Mono']">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CribsPage />} />
            <Route path="/cribs/:cribId" element={<IndividualPage />} />
            <Route
              path="/profile/:username"
              element={<ProfileUsernamePage />}
            />
            <Route path="/support" element={<SupportPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/general" element={<General />} />
              <Route path="/settings/account" element={<Account />} />
              <Route
                path="/settings/notifications"
                element={<Notifications />}
              />
              <Route path="/profile" element={<ProfilePage />}>
                <Route path=":username" element={<ProfileUsernamePage />} />
              </Route>
              <Route path="/profile/post" element={<Post />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/admin" element={<AdminDraftCribsPage />} />
              <Route path="/admin/drafts" element={<AdminDraftCribsPage />} />
              <Route
                path="/admin/drafts/:draftId"
                element={<AdminDraftIndividualCribPage />}
              />
              <Route
                path="/admin/thumbnail"
                element={<AdminDraftThumbnailPage />}
              />
            </Route>

            <Route element={<ReverseProtectedRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
