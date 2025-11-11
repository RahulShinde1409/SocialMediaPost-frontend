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
            <header className="absolute inset-x-0 top-0 z-50 bg-[#124559] h-[12%] sm:h-[15%]">
               <nav
  aria-label="Global"
  className="flex items-center justify-between p-4 lg:px-8"
>
  {/* Left Section: Logo + Hamburger */}
  <div className="flex items-center justify-start gap-3 flex-1">
    {/* Hamburger icon — visible only on small screens */}
    <button
      type="button"
      onClick={() => setMobileMenuOpen(true)}
      className="inline-flex items-center justify-center rounded-md p-2.5 text-white lg:hidden"
    >
      <Bars3Icon aria-hidden="true" className="h-8 w-8" />
    </button>

    {/* Logo */}
    <Link to="/view-post" className="flex items-center">
      <img
        alt="logo"
        src={logofeed}
        className="w-auto h-14 sm:h-16 lg:h-20 object-contain"
      />
    </Link>
  </div>

  {/* Center Section: Navigation links (visible only on large screens) */}
  <div className="hidden lg:flex lg:gap-x-12 lg:flex-1 lg:justify-center">
    {navigation.map((item) => (
      <NavLink
        key={item.name}
        to={item.href}
        className={({ isActive }) =>
          isActive
            ? "text-sm font-semibold text-lime-300"
            : "text-sm font-semibold text-white"
        }
      >
        {item.name}
      </NavLink>
    ))}
  </div>

  {/* Right Section: Logout or Auth Links */}
  <div className="flex justify-end flex-1">
    {isLogged ? (
      <button
        className="flex items-center gap-2 text-white font-bold text-[14px] cursor-pointer"
        onClick={handleLogout}
      >
        Logout <TbLogout className="text-[20px]" />
      </button>
    ) : (
      <div className="hidden lg:flex lg:gap-x-4">
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




                <Dialog
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                    className="lg:hidden"
                >
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-64 overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                         
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="rounded-md p-2.5 text-gray-700"
                            >
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>


                        <div className="mt-6 flow-root">
                            <div className="space-y-2">
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
                                        className="w-full text-left block rounded-lg px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-100"
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
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </>
    );
};

export default Header;
