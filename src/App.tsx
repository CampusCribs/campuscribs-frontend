import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "@/components/layout/Layout";

import CribsPage from "@/pages/cribs/CribsPage";
import IndividualCrib from "@/pages/individualCrib/IndividualCrib";
import ProfilePage from "@/pages/profile/ProfilePage";

function App() {
  return (
    // Default font is Roboto Mono
    <div className="font-['Roboto_Mono']">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CribsPage />} />
            <Route path="/cribs/:cribId" element={<IndividualCrib />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
