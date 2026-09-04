import { Route, Routes } from "react-router-dom";
import LandPage from "./pages/LandPage";
import RegisterPage from "./pages/RegisterPage";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";
import RequireAuth from "./Requireauth";

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<LandPage />} 
      />
      <Route 
        path="/register" 
        element={<RegisterPage />} 
      />
      <Route 
        path="/explore" 
        element={<ExplorePage />} 
      />
      <Route element={<RequireAuth />}>
        <Route 
          path="/dashboard" 
          element={<DashboardPage />} 
        />
      </Route>
    </Routes>
  )
}

export default App;
