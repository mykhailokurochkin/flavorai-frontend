import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <nav className="">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <ul className="flex space-x-4">
          <li><NavLink to='/recipes' className="hover:text-gray-300">Recipes</NavLink></li>
          <li><NavLink to='' className="hover:text-gray-300">Log in</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;