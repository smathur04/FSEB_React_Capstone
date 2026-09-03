import { Route, Routes } from "react-router";
import LandPage from "./pages/LandPage";


function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<LandPage />} 
      />
    </Routes>
  )
}

export default App;
