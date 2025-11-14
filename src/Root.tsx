import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import App from "./App";
import RecipesPage from "./modules/RecipesPage/RecipesPage";
import HomePage from "./modules/HomePage/HomePage";
import SignInPage from "./modules/AuthPage/SignInPage";
import SignUpPage from "./modules/AuthPage/SignUpPage";
import NewRecipeFormPage from "./modules/NewRecipeFormPage/NewRecipeFormPage";
import RecipeDetailsPage from "./modules/RecipeDetailsPage/RecipeDetailsPage";
import PublicRoute from './components/PublicOnlyRoute/PublicOnlyRoute';
import MyRecipesPage from './modules/MyRecipesPage/MyRecipesPage';

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="recipes" element={<RecipesPage />} />
            <Route path="recipes/new" element={<NewRecipeFormPage />} />
            <Route path="recipes/:id" element={<RecipeDetailsPage />} />
            <Route path="my-recipes" element={<MyRecipesPage />} /> 
            <Route path="sign-in" element={<PublicRoute><SignInPage /></PublicRoute>} />
            <Route path="register" element={<PublicRoute><SignUpPage /></PublicRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default Root;