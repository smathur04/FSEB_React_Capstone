import { Route, Routes } from "react-router-dom";
import LandPage from "./pages/LandPage";
import RegisterPage from "./pages/RegisterPage";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import CreatePage from "./pages/CreatePage";
import RequireAuth from "./Requireauth";
import { useState } from "react";

function App() {

  const [toast, setToast] = useState<string | null>(null);

  function flashToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <>
    {toast && <div className="toast">{toast}</div>}
    <Routes>
      <Route
        path="/"
        element={<LandPage />}
      />
      <Route
        path="/login"
        element={<LandPage />}
      />
      <Route
        path="/register"
        element={<RegisterPage />}
      />
      <Route
        path="/recipes"
        element={<ExplorePage />}
      />
      <Route
        path="/recipes/:id"
        element={<RecipeDetailPage />}
      />
      <Route element={<RequireAuth />}>
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        <Route
          path="/create"
          element={<CreatePage onSuccess={() => flashToast("Your recipe was successfully created.")}  />}
        />
      </Route>
    </Routes>
    </>
  )
}

export default App;