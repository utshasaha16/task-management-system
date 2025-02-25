import {
  Button,
  IconButton,
  Typography,
  Collapse,
  Navbar,
} from "@material-tailwind/react";
import { LuMenu } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Add Task",
    href: "/add-task",
  },
];

function NavList() {
  return (
    <ul className="mt-4 flex flex-col gap-x-3 gap-y-1.5 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ title, href }, idx) => (
        <li key={idx}>
          <NavLink to={href}>
            <Typography
              type="small"
              className="flex items-center gap-x-2 p-1 hover:text-primary"
            >
              {title}
            </Typography>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

const StickyNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openNav, setOpenNav] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div>
      <Navbar className="fixed z-10 w-11/12 rounded-none">
        <div className="flex items-center">
          <Link to="/">
            <Typography type="small" className=" mr-2 block py-1 font-semibold">
              Task Management
            </Typography>
          </Link>
          <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />
          <div className="hidden lg:block">
            <NavList />
          </div>
          {user ? (
            <>
              <Button
                onClick={handleLogout}
                size="sm"
                className="hidden bg-indigo-500 hover:bg-indigo-600 border-none lg:ml-auto lg:inline-block"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                className="hidden bg-indigo-500 hover:bg-indigo-600 border-none lg:ml-auto lg:inline-block"
              >
                <Link to="/signIn">Sign In</Link>
              </Button>
            </>
          )}

          <IconButton
            size="sm"
            variant="ghost"
            color="secondary"
            onClick={() => setOpenNav(!openNav)}
            className="ml-auto grid lg:hidden"
          >
            {openNav ? (
              <HiMiniXMark className="text-3xl"></HiMiniXMark>
            ) : (
              <LuMenu className="text-3xl"></LuMenu>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div>
            {user ? (
              <>
                <Button
                  isFullWidth
                  onClick={handleLogout}
                  size="sm"
                  className="bg-indigo-500 hover:bg-indigo-600 border-none lg:ml-auto lg:inline-block"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  isFullWidth
                  size="sm"
                  className="bg-indigo-500 hover:bg-indigo-600 border-none lg:ml-auto lg:inline-block"
                >
                  <Link to="/signIn">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default StickyNavbar;
