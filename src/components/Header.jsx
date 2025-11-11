import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logofeed from "../assets/Images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/login.slice";
import { TbLogout } from "react-icons/tb";

const navigation = [
  { name: "Create Post", href: "/create-post" },
  { name: "View Post", href: "/view-post" },
  { name: "Other Post", href: "/other-post" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLogged } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#124559] shadow-md">
        <nav
          aria-label="Global"
          className="flex items-center justify-between px-5 py-3 md:px-10 lg:py-4"
        >
          {/* Left Section: Hamburger + Logo (logo hidden on mobile) */}
          <div className="flex items-center gap-3 flex-1">
            {/* Hamburger icon (mobile only) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-white lg:hidden"
            >
              <Bars3Icon aria-hidden="true" className="h-7 w-7" />
            </button>

            {/* Logo (only visible on desktop) */}
            <Link to="/view-post" className="hidden sm:flex items-center">
              <img
                alt="logo"
                src={logofeed}
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300"
              />
            </Link>
          </div>

          {/* Center Navigation (visible only on large screens) */}
          <div className="hidden lg:flex lg:gap-x-10 lg:flex-1 lg:justify-center">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-semibold ${
                    isActive ? "text-lime-300" : "text-white hover:text-lime-200"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section: Logout / Auth Links */}
          <div className="flex justify-end flex-1">
            {isLogged ? (
              <button
                className="flex items-center gap-2 text-white font-semibold text-[15px] hover:text-lime-200 transition-all"
                onClick={handleLogout}
              >
                Logout <TbLogout className="text-[20px]" />
              </button>
            ) : (
              <div className="hidden lg:flex lg:gap-x-6">
                <Link
                  to="/admin"
                  className="text-sm font-semibold text-white hover:text-lime-200"
                >
                  Admin
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-white hover:text-lime-200"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-white hover:text-lime-200"
                >
                  Log in →
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-40 bg-black/40" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl p-6 sm:max-w-sm">
            {/* Logo inside menu */}
            <div className="flex items-center justify-between mb-4">
              <img
                src={logofeed}
                alt="logo"
                className="h-12 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md p-2 text-gray-700 hover:bg-gray-200"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block rounded-lg px-3 py-2 text-base font-semibold text-blue-600 bg-gray-100"
                      : "block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              {isLogged ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-left rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-100"
                >
                  Logout <TbLogout />
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
};

export default Header;
