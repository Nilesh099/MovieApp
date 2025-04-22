import React, { use, useEffect } from "react";
import { useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { FaSearch } from "react-icons/fa";
import {href,  Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navigation } from "../contants/navigation";

const Header = () => {
  const location=useLocation();
  const removeSpace=location?.search?.slice(3).split("%20")?.join(" ");
  console.log("removeSpace", removeSpace);  
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  useEffect(() => {
    if(searchInput){
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <header className="fixed top-0 w-full h-16 bg-black opacity-50 z-40">
      <div className="container mx-auto px-3 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>

        <nav className="hidden lg:flex items-center gap-4 ml-6">
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-blue-100 ${isActive && "text-blue-100"}`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search here...."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <FaSearch />
            </button>
          </form>
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all duration-200">
            <img src={user} alt="user" width="w-full h-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
