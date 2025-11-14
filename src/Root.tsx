import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import RecipesPage from "./modules/RecipesPage/RecipesPage";
import HomePage from "./modules/HomePage/HomePage";
import SignInPage from "./modules/AuthPage/SignInPage";
import SignUpPage from "./modules/AuthPage/SignUpPage";
import NewRecipeFormPage from "./modules/NewRecipeFormPage/NewRecipeFormPage";

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/new" element={<NewRecipeFormPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="register" element={<SignUpPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Root;