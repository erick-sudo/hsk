import {
  AccountCircleOutlined,
  HomeMiniOutlined,
  MenuOutlined,
  QuestionAnswerOutlined,
  RoomServiceOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import AppName from "../common/AppName";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const styles = {
  submit: {
    backgroundColor: "rgb(71, 3, 131)",
    "&:hover": {
      backgroundColor: "rgb(148, 77, 211)",
    },
  },
};

const nalLinks = [
  {
    name: "Home",
    path: "/",
    icon: <HomeMiniOutlined />,
  },
  {
    name: "Services",
    path: "/dashboard",
    icon: <RoomServiceOutlined />,
  },
  {
    name: "About Us",
    path: "/about",
    icon: <QuestionAnswerOutlined />,
  },
];

function TopNavigationBar() {
  const navigate = useNavigate();
  const { userInfo, logout } = useContext(AppContext);

  return (
    <div className="flex px-4 py-2 container items-center">
      <div className="flex grow">
        <AppName />
      </div>

      {/* Large Screen */}
      <div className="hidden xl:flex items-start gap-4 px-4">
        {nalLinks.map((nalLink, idx) => {
          return (
            <Button
              onClick={() => navigate(nalLink.path)}
              key={idx}
              variant="info"
              className=""
              sx={{ textTransform: "none" }}
            >
              {nalLink.name}
            </Button>
          );
        })}
      </div>

      {/* Small Screen */}
      <div className="xl:hidden group grow flex justify-end px-4">
        <button className="text-purple-900 hover:bg-purple-300 p-2">
          <MenuOutlined />
        </button>
        <div className="relative">
          <div className="hidden group-hover:grid absolute z-50 right-0 top-full bg-purple-300 min-w-48">
            {nalLinks.map((nalLink, idx) => {
              return (
                <button
                  onClick={() => navigate(nalLink.path)}
                  key={idx}
                  className="py-2 px-4 hover:bg-purple-900 hover:text-[#fff] duration-300 text-left"
                >
                  <div className="whitespace-nowrap">{nalLink.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {userInfo ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-purple-200 pl-2 pr-6 py-2 rounded-full font-extrabold text-purple-900">
            <AccountCircleOutlined />
            <span>{userInfo?.first_name}</span>
          </div>
          <button
            onClick={() => logout()}
            className="px-4 ring-2 rounded ring-purple-700 text-purple-700 hover:bg-purple-700 hover:text-[#fff] duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 ring-2 rounded ring-purple-700 text-purple-700 hover:bg-purple-700 hover:text-[#fff] duration-300"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default TopNavigationBar;
