import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-white text-gray-800 p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                isActive ? "font-bold border-b-2 border-green-600 pb-1" : "hover:text-gray-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/recipes'
              className={({ isActive }) =>
                isActive ? "font-bold border-b-2 border-green-600 pb-1" : "hover:text-gray-600"
              }
            >
              Recipes
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <NavLink
                to='/my-recipes'
                className={({ isActive }) =>
                  isActive ? "font-bold border-b-2 border-green-600 pb-1" : "hover:text-gray-600"
                }
              >
                My Recipes
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to='/sign-in'
                className={({ isActive }) =>
                  isActive ? "font-bold border-b-2 border-green-600 pb-1" : "hover:text-gray-600"
                }
              >
                Log in
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;