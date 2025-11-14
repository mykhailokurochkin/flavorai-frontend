import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RecipesPage from "./modules/RecipesPage/RecipesPage";

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<p className="p-4">Welcome to FlavorAI!</p>} /> {/* Default content for '/' */}
        <Route path="recipes" element={<RecipesPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Root;