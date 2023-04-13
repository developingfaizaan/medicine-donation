import { Link, NavLink } from "react-router-dom";

import { useAuth } from "../context/auth";
import { useTranslate } from "../context/translate";
import { logo, logoutIcon } from "../assets";
import { SwitchBtn } from "./";

const generateActiveStyle = ({ isActive }) => isActive ? { color: "#3B82F6" } : {};

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language } = useTranslate();

  return (
    <header className="flex flex-col pt-5 pb-2 sm:flex-row items-center justify-between px-5 sm:h-20 m-auto max-w-7xl border-b-2 border-black200 sm:border-none">
      <Link to="/"><img src={logo} alt="Logo" /></Link>

      <nav className="flex gap-x-10 gap-y-5 py-5 items-center justify-center flex-wrap">
        {user ? (
          <>
            {user?.user?.role !== "organization" && (<NavLink to="/create" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>{language.Create}</NavLink>)}

            <NavLink to={`/user/${user?.user?.id}`} className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>{language.Profile}</NavLink>

            <button onClick={logout} title="logout" className="flex items-center gap-2 bg-white200 p-3 rounded-md">
              <h6 className="text-white700">{user?.user?.email}</h6>
              <img src={logoutIcon} alt="Logout" />
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>{language.Login}</NavLink>
            <NavLink to="/signup" className="text-white700 hover:text-primary ease-out duration-200" style={generateActiveStyle}>{language.Signup}</NavLink>
          </>
        )}
        <SwitchBtn />
      </nav>
    </header>
  );
};

export default Navbar;
