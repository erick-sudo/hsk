import AppName from "./common/AppName";

import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router";
import { LoginOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { ValidationErrors } from "./common/ValidationErrors";
import { axiosGet, axiosPatch } from "../lib/axiosLib";
import { apis } from "../lib/apis";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { ClockIcon } from "@heroicons/react/24/outline";

const styles = {
  submit: {
    margin: "1.5em 0",
    backgroundColor: "rgb(71, 3, 131)",
    "&:hover": {
      backgroundColor: "rgb(148, 77, 211)",
    },
  },
  customCheckbox: {
    color: "rgb(71, 3, 131)",
    marginRight: "10px",
    "&.Mui-checked": {
      color: "rgb(71, 3, 131)",
    },
  },
  textField: {
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
};

const ResetPassword = () => {
  const [validity, setValidity] = useState({
    checked: false,
    ok: true,
    finding: "",
  });
  const [passwordErrors, setPasswordErrors] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirm_new_password: "",
  });
  const navigate = useNavigate();
  const { uidb64, token } = useParams();
  const { snackNotifier, startLoading, stopLoading } = useContext(AppContext);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (validity.checked === false) {
      confirmResetPasswordLink();
    }
  }, []);

  function confirmResetPasswordLink() {
    startLoading();
    axiosGet(
      apis.confirmPasswordReset
        .replace("<uidb64>", uidb64)
        .replace("<token>", token)
    )
      .then((response) => {
        // Link valid
        stopLoading();
      })
      .catch((axiosError) => {
        stopLoading();
        if (axiosError?.response?.data?.failure_code === "TOKEN_ERROR") {
          setValidity({
            ...validity,
            checked: true,
            ok: false,
            finding: axiosError.response.data.detail.message,
          });
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    startLoading();
    axiosPatch(apis.setNewPassword, {
      uidb64: uidb64,
      token: token,
      password: formData.password,
      password_confirmation: formData.confirm_new_password,
    })
      .then((response) => {
        stopLoading();
        snackNotifier(response?.data?.message, "success", "top-center");
        setFormData({
          password: "",
          confirm_new_password: "",
        });
      })
      .catch((axiosError) => {
        stopLoading();
        if (axiosError?.response?.data?.failure_code === "VALIDATION_ERRORS") {
          setPasswordErrors(axiosError.response.data.detail.message);
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
      });
  }

  return (
    <div className="flex fixed inset-0 justify-center items-center">
      <Container maxWidth="xs" className={`px-4 m-4`}>
        <div className="flex justify-center py-8">
          <AppName />
        </div>
        <div className="mb-6">
          <Typography className="text-center" component="h1" variant="h5">
            Reset your password
          </Typography>
        </div>

        <form className="" onSubmit={handleSubmit} sx={styles.form}>
          <TextField
            value={formData.password}
            onChange={handleChange}
            sx={styles.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Create new password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordErrors?.password && (
            <ValidationErrors errors={passwordErrors} errorsKey="password" />
          )}
          <TextField
            value={formData.confirm_new_password}
            onChange={handleChange}
            sx={styles.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_new_password"
            label="Confirm new password"
            type={showPassword ? "text" : "password"}
            id="confirm_new_password"
            autoComplete="confirm_new_password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordErrors?.password_confirmation && (
            <ValidationErrors
              errors={passwordErrors}
              errorsKey="password_confirmation"
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={styles.submit}
            disabled={Boolean(
              validity.checked === true && validity.ok === false
            )}
          >
            Save password & login
          </Button>
        </form>
        <div className="py-2">
          {validity.checked && !validity.ok && (
            <Alert severity="error">
              <div>{validity.finding}</div>
            </Alert>
          )}
        </div>

        <div className="flex mt-4 gap-4">
          <NavLink
            className="flex grow items-center gap-2 border-1 py-1 px-2 border-purple-400 text-purple-400 hover:text-purple-800 hover:border-purple-800 duration-300 rounded-full"
            to="/forgot_password"
          >
            <ClockIcon height={24} />
            <span>Request new reset link</span>
          </NavLink>
          <button
            title="Login"
            className="text-purple-600 border-1 border-purple-300 rounded-full hover:border hover:border-purple-700 px-4 py-1 duration-300"
            onClick={() => navigate("/login")}
          >
            <LoginOutlined />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
