import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import Login from "./Login";
import { useLocation } from "react-router-dom";
import { services } from "../config";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Settings",
    icon: Cog6ToothIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const isLoggedIn = !!localStorage.getItem("authToken");

  if (!isLoggedIn) {
    return (
      <Login />
    );
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = services;

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const userType = localStorage.getItem("userType");

  const renderItems = navListMenuItems
    .filter(({ auth }) => {
      if (auth === "all") return true;
      if (auth === "internal" && (userType === "admin" || userType === "internal")) return true;
      return false;
    })
    .map(({ title, logo, link }) => (
      <a href={link} key={title}>
        <MenuItem className="p-1 flex justify-start bg-transparent hover:bg-transparent shadow-none border-none">
          <img
            src={logo}
            alt={title}
            className="h-6 w-auto object-contain bg-transparent"
            style={{ backgroundColor: "transparent" }}
          />
        </MenuItem>
      </a>
    ));

  return (
    <>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />
              Services
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>

        <MenuList className="hidden flex-col gap-1 p-2 lg:flex w-48">
          {renderItems}
        </MenuList>
      </Menu>

      {/* Mobile version fallback */}
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />
        Services
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {navListMenuItems
          .filter(({ auth }) => auth === "all" || (auth === "internal" && (userType === "admin" || userType === "internal")))
          .map(({ title, link }) => (
            <a href={link} key={title}>
              <MenuItem>{title}</MenuItem>
            </a>
          ))}
      </ul>
    </>
  );
}


// nav list component
// const navListItems = [
//   {
//     label: "Account",
//     icon: UserCircleIcon,
//   },
//   {
//     label: "Blocks",
//     icon: CubeTransparentIcon,
//   },
//   {
//     label: "Docs",
//     icon: CodeBracketSquareIcon,
//   },
// ];

function NavList() {
  return (
    // <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
    <NavListMenu />
    // {navListItems.map(({ label, icon }, key) => (
    //   <Typography
    //     key={label}
    //     as="a"
    //     href="#"
    //     variant="small"
    //     color="gray"
    //     className="font-medium text-blue-gray-500"
    //   >
    //     <MenuItem className="flex items-center gap-2 lg:rounded-full">
    //       {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
    //       <span className="text-gray-900"> {label}</span>
    //     </MenuItem>
    //   </Typography>
    // ))}
    // </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Navbar
      fullWidth
      className="fixed top-0 left-0 z-50 p-2 lg:rounded-none lg:pl-6 bg-white shadow"
    >


      <div className="relative flex w-full items-center justify-between text-blue-gray-900">
        {/* Left: Logo */}
        <a href="/" className="ml-2 flex-shrink-0">
          <img
            src="/logo-crp.png"
            alt="FONQP Logo"
            className="h-7 w-auto"
          />
        </a>

        <div className="flex items-center gap-6 ml-auto pr-4">
          {/* Mobile hamburger (hidden on lg) */}
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          {/* Desktop NavList (hidden on small) */}
          {!isHome &&
            <div className="hidden lg:block">
              <NavList />
            </div>
          }

          {isHome && (
            <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
              <Typography
                variant="h4"
                className="text-cyan-800 font-bold"
              >
                Services
              </Typography>
            </div>
          )}

          {!isHome && (
            <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
              <img
                src={
                  services.find(s => s.link === location.pathname)?.logo ||
                  "/default-logo.png" // Fallback logo if not found
                }
                alt="Page Logo"
                className="h-12"
              />
            </div>
          )}

          <ProfileMenu />

        </div>

      </div>
      {isNavOpen && (
        <MobileNav open={isNavOpen} className="lg:hidden overflow-scroll">
          <NavList />
        </MobileNav>
      )}
    </Navbar>
  );
}