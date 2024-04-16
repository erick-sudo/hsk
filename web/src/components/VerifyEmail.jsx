import AppName from "./common/AppName";

import React, { useContext, useState } from "react";
import {
  Button,
  Typography,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";

import { MuiOtpInput } from "mui-one-time-password-input";
import { axiosPost } from "../lib/axiosLib";
import { apis } from "../lib/apis";
import { AppContext } from "./context/AppContext";
import { Login, LoginOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const styles = {
  submit: {
    margin: "3px 0px 2px",
    backgroundColor: "rgb(71, 3, 131)",
    "&:hover": {
      backgroundColor: "rgb(148, 77, 211)",
    },
  },
};

const VerifyEmail = () => {
  const [otp, setOtp] = React.useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resending, setResending] = useState(false);
  const { snackNotifier, startLoading, stopLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleResendClick = () => {
    setResending(true);
    // Simulate API call for OTP resend
    setTimeout(() => {
      setResending(false);
      setResendDisabled(true);
      // Enable resend after 60 seconds
      setTimeout(() => {
        setResendDisabled(false);
      }, 6000);
    }, 2000); // Simulate 2 seconds delay for API call
  };

  function handleSubmit(e) {
    e.preventDefault();
    startLoading();
    axiosPost(apis.verifyEmail, {
      otp_code: otp,
    })
      .then((response) => {
        stopLoading();
        snackNotifier(response.data.message, "success", "top-center");
        setOtp("");
      })
      .catch((axiosError) => {
        stopLoading();
        if (axiosError?.response?.data?.failure_code === "ALREADY_VERIFIED") {
          snackNotifier(
            axiosError?.response?.data.detail.message,
            "warning",
            "top-center"
          );
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
      });
  }

  return (
    <div className="flex fixed inset-0 justify-center items-center">
      <div className={`px-4 m-4 max-w-lg`}>
        <div className="flex justify-center pb-8">
          <AppName />
        </div>
        <div className="mb-6">
          <Typography className="text-center" component="h1" variant="h5">
            OTP Verification
          </Typography>
        </div>

        <div className="mb-6 max-w-[12rem] mx-auto">
          <Typography className="text-center" component="div" variant="div">
            Please enter the OTP sent to your email.
          </Typography>
        </div>

        <Divider />

        <div className="mb-4 grid gap-4">
          <MuiOtpInput
            autoFocus
            validateChar={(value, index) =>
              Boolean(`${value}`.match(/[0-9]{1}/))
            }
            length={6}
            value={otp}
            onChange={handleChange}
            sx={{
              "& .MuiOtpInput-TextField": {
                "& label.Mui-focused": {
                  color: "rgb(71, 3, 131)",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "rgb(148, 77, 211)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(71, 3, 131)",
                  },
                },
              },
            }}
          />
          <Grid item xs={12}>
            <div className="max-w-xs mx-auto">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={otp.length !== 6}
                sx={styles.submit}
              >
                Verify OTP
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Didn't receive OTP?&nbsp;
              <Button
                color="primary"
                onClick={handleResendClick}
                disabled={resendDisabled}
                sx={{
                  color: "rgb(71, 3, 131)",
                  "&:hover": {
                    color: "rgb(148, 77, 211)",
                  },
                }}
              >
                {resending ? (
                  <CircularProgress
                    sx={{
                      "& .MuiCircularProgress-circle": {
                        color: "rgb(148, 77, 211)",
                      },
                    }}
                    size={20}
                  />
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </Typography>
          </Grid>
          <div className="flex">
            <button
              title="Login"
              className="text-purple-600 ring-1 ring-purple-300 rounded-lg mx-auto hover:ring hover:ring-purple-700 px-4 py-1 duration-300"
              onClick={() => navigate("/login")}
            >
              <LoginOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
