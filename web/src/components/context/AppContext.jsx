import React, { createContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { axiosGet, axiosPost } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";

const AppContext = createContext();

function AppProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    axiosGet(apis.profile)
      .then((response) => {
        setUserInfo(response?.data?.user);
      })
      .catch((axiosError) => {
        // console.log(axiosError
      });
  }, []);

  const snackNotifier = (message, variant = "success", position = "bottom") => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
      anchorOrigin: position
        ? (() => {
            const V_ANCHOR_ORIGINS = ["top", "bottom"];
            const H_ANCHOR_ORIGINS = ["left", "right", "center"];
            const positions = position.split("-").slice(0, 2);
            return {
              vertical: V_ANCHOR_ORIGINS.includes("" + positions[0])
                ? positions[0]
                : "bottom",
              horizontal: H_ANCHOR_ORIGINS.includes("" + positions[1])
                ? positions[1]
                : "left",
            };
          })()
        : { vertical: "bottom", horizontal: "left" },
    });
  };

  const logout = async () => {
    setUserInfo(null);
    await axiosGet(apis.logout)
      .then((res) => {
        snackNotifier("Logged out succesfully", "info", "top-right");
      })
      .catch((err) => {
        //
        console.log(err);
      });
  };

  const contextData = {
    loading,
    userInfo,
    setUserInfo,
    startLoading,
    stopLoading,
    snackNotifier,
    logout,
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppProvider };
