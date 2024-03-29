import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/auth";
import { logo } from "../assets";

const generateActiveStyle = ({ isActive }) => isActive ? { color: "#12A796", fontWeight: "bold" } : {};

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col pt-5 pb-2 sm:flex-row items-center justify-between px-5 sm:h-20 m-auto max-w-7xl border-b-2 border-black200 sm:border-none">
      <Link to="/"><img src={logo} alt="Logo" /></Link>

      <nav className="flex gap-x-8 gap-y-5 py-5 items-center justify-center flex-wrap">
        <NavLink to="/" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>Home</NavLink>
        {user ? (
          <>
            {user?.user?.role !== "organization" && (<NavLink to="/donate" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>Donate</NavLink>)}

            <NavLink to={`/user/${user?.user?.id}`} className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>Profile</NavLink>

            <button onClick={logout} title="logout" className="flex items-center gap-2 bg-red-100 p-3 rounded-md">
              <h6 className="text-red-600">Logout</h6>
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>Login</NavLink>
            <NavLink to="/signup" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
