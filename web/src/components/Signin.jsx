import AppName from "./common/AppName";
import { Google } from "@mui/icons-material";

import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import {
  MailOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useLogin } from "../hooks/useLogin";
import Or from "./common/Or";

const styles = {
  root: {
    position: "fixed",
    inset: 0,
  },
  avatar: {
    margin: "auto",
    width: "48px",
    height: "48px",
    backgroundColor: "rgb(71, 3, 131)",
  },

  submit: {
    margin: "3px 0px 2px",
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

const Signin = () => {
  const [loginErrors, setLoginErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [handleLogin] = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleGoogleLogin() {
    //axiosPost()
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({
      payload: {
        ...formData,
        remember_me: rememberMe,
      },
      errorCallback: (err) => {
        setLoginErrors(err);
      },
    });
  }

  return (
    <div className="">
      <Container maxWidth="xs" className={`px-4 m-4`}>
        {loginErrors && (
          <div className="py-4 gap-2 grid">
            {loginErrors.failure_code === "NOT_VERIFIED" && (
              <Alert severity="info">
                <div>
                  Please ensure you verify your email address before any login
                  attempt
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => navigate("/verify_email")}
                    sx={{ borderRadius: "20px" }}
                    size="small"
                    variant="outlined"
                  >
                    Verify Account
                  </Button>
                </div>
              </Alert>
            )}
            {loginErrors.failure_code === "AUTHENTICATION" && (
              <Alert severity="error">
                <div>{loginErrors.detail.message}</div>
              </Alert>
            )}
          </div>
        )}
        <div className="flex justify-center py-8">
          <AppName />
        </div>
        <Typography className="text-center" component="h1" variant="h5">
          Sign in
        </Typography>

        <form onSubmit={handleSubmit} sx={styles.form}>
          <TextField
            value={formData.email}
            onChange={handleChange}
            sx={styles.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="email icon" edge="end">
                    <MailOutlineOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            value={formData.password}
            onChange={handleChange}
            sx={styles.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
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
          <Grid container>
            <Grid item sm={6} className="flex items-center justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    sx={styles.customCheckbox}
                  />
                }
                label="Remember me"
              />
            </Grid>
            <Grid item sm={6} className="flex items-center justify-center">
              <NavLink
                className="hover:text-purple-800 text-purple-600 text-center mx-auto"
                to="/forgot_password"
                variant="body2"
              >
                Forgot password?
              </NavLink>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Continue
          </Button>
          <Grid container>
            <NavLink
              className="hover:text-purple-800 text-purple-600 text-center mt-4 mx-auto"
              to="/signup"
              variant="body2"
            >
              Don't have an account? Sign Up
            </NavLink>
          </Grid>
        </form>

        <Or className="mt-4" />

        <div className="my-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-2 rounded-md justify-center w-full py-2 border-1 hover:text-purple-700 hover:border-purple-700 duration-300"
          >
            <Google />
            Continue with google
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Signin;
