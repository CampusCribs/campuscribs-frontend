import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";

import CribsPage from "./pages/cribs/CribsPage";

function App() {
  return (
    // Default font is Roboto Mono
    <div className="font-['Roboto_Mono']">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<CribsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
