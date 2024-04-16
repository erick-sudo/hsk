import { useContext } from "react";
import { axiosPost, axiosGet } from "../lib/axiosLib";
import { apis } from "../lib/apis";
import { AppContext } from "../components/context/AppContext";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { setUserInfo, startLoading, stopLoading, snackNotifier } =
    useContext(AppContext);
  const navigate = useNavigate();

  function updateUserInformation(userData) {
    setUserInfo(userData);
  }

  const handleLogin = async ({ payload = {}, errorCallback = () => {} }) => {
    startLoading();
    await axiosPost(apis.login, payload)
      .then(async (response) => {
        stopLoading();
        snackNotifier("Successfully logged in", "success", "top-center");
        await axiosGet(apis.profile)
          .then((response) => {
            updateUserInformation(response.data.user);
            navigate("/dashboard");
          })
          .catch((axiosError) => {
            errorCallback(axiosError.response.data);
          });
      })
      .catch((axiosError) => {
        stopLoading();
        if (axiosError?.response?.data) {
          errorCallback(axiosError?.response?.data);
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
      });
  };

  return [handleLogin];
}
