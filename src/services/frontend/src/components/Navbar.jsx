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
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import Login from "./Login";
import { useLocation } from "react-router-dom";

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
const navListMenuItems = [
  {
    title: "Latex Server",
    description:
      "Internal Latex Server",
    auth: "internal",
    // link to current page/latex
    link: "/services/latex",
  },
  {
    title: "MetaMizer",
    description:
      "Design Metamaterials",
    auth: "all",
    link: "/services/metamizer",
  },
  {
    title: "Datasets",
    description:
      "Optical Datasets",
    auth: "all",
    link: "/services/datasets",
  },
  {
    title: "Random Number Generator",
    description:
      "Access TRNGs",
    auth: "all",
    link: "/services/rng",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const userType = localStorage.getItem("userType");
  const renderItems = navListMenuItems
    .filter(({ auth }) => {
      if (auth === "all") return true;
      if (auth === "internal" && (userType === "admin" || userType === "internal")) return true;
      return false;
    })
    .map(({ title, description, link }) => (
      <a href={link} key={title}>
        <MenuItem>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {title}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {description}
          </Typography>
        </MenuItem>
      </a>
    ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
              Services{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
        Services{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Account",
    icon: UserCircleIcon,
  },
  {
    label: "Blocks",
    icon: CubeTransparentIcon,
  },
  {
    label: "Docs",
    icon: CodeBracketSquareIcon,
  },
];

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
  const isMetamizer = location.pathname === "/services/metamizer";
  const isRng = location.pathname === "/services/rng";

  return (
    <Navbar className="w-screen max-w-none p-2 lg:rounded-none lg:px-6">

      <div className="relative mx-auto flex items-centerjustify-between text-blue-gray-900">
        <a href="/" className="mr-4 ml-2 cursor-pointer py-1.5">
          <img
            src="/logo-crp.png"
            alt="FONQP Logo"
            className="h-7 w-auto"
          />
        </a>

        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {isMetamizer && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/MetaMizer-logo.png"
              alt="MetaMizer Logo"
              className="h-12"
            />
          </div>
        )}

        {isRng && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/rng-logo.png"
              alt="RNG Logo"
              className="h-12"
            />
          </div>
        )}

        <div className="ml-auto">
          <ProfileMenu />
        </div>

      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}