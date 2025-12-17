import React, { useEffect, useState } from "react";
import { getProfile } from "../services/userServices";
import { getProfile as getTrainerData } from "../services/trainerServices";
import { useNavigate } from "react-router-dom";
import MyGymLogo from "../assets/image/logo.png";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { BellIcon } from "@heroicons/react/24/outline";
import { logout } from "../redux/features/userSlice";
import { persistor } from "../redux/store";
import { doLogout } from "../services/userServices";
// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Team", href: "#", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
//   { name: "Reports", href: "#", current: false },
// ];

export default function Header() {
  const user1 = useSelector((state) => state.user.user);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      getProfile()
        .then((res) => {
          setUserData(res.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    }
  };
  const fetchTrainerData = async () => {
    try {
      getTrainerData()
        .then((res) => {
          setUserData(res.data.trainer);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    }
  };
  useEffect(() => {
    if (user1.role == "user") {
      fetchUserData();
    }
    if (user1.role == "trainer") {
      fetchTrainerData();
    }
  }, []);
  const handleLogout = async () => {
    try {
      console.log(user1);
      await doLogout();
      await persistor.purge();
      dispatch(logout());
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  const goToProfile = () => {
    navigate("./profile");
  };

  const userNavigation = [
    { name: "Your profile", onClick: goToProfile },
    { name: "Settings", href: "#" },
    { name: "Sign out", onClick: handleLogout },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full fixed top-0 z-50">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between ">
            <div className="p-4 text-2xl border-b font-bold border-white/20">
              <div className="shrink-0 flex">
                <img alt="Your Company" src={MyGymLogo} className="pr-2" />
                <h1 className="text-white">FITNESS CLUB</h1>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))} */}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
                <div className="ml-2 flex items-center md:ml-2">
                  <h1 className="text-white float-right">
                    Welcome,{" "}
                    {userData?.fullname
                      ? userData.fullname
                      : user1
                      ? user1.username
                      : "Guest"}
                    !
                  </h1>
                </div>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={userData.image}
                      className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5">
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        {item.onClick ? (
                          <button
                            onClick={item.onClick}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
