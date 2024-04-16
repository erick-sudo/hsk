import AppName from "./common/AppName";
import {
  Google,
  Person4Outlined,
  PhoneEnabledOutlined,
} from "@mui/icons-material";

import React, { useContext, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import {
  MailOutlineOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { ValidationErrors } from "./common/ValidationErrors";
import Or from "./common/Or";
import { AppContext } from "./context/AppContext";
import { axiosPost } from "../lib/axiosLib";
import { apis } from "../lib/apis";

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

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registrationData, setRegistrationData] = useState({});
  const [agree, setagree] = useState(false);
  const navigate = useNavigate();
  const { startLoading, stopLoading, snackNotifier } = useContext(AppContext);

  const [validationErrors, setValidationErrors] = useState({});

  const handleRegistrationDataChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountCreation = (e) => {
    e.preventDefault();
    startLoading();
    axiosPost(apis.register, {
      ...registrationData,
    })
      .then((res) => {
        stopLoading();
        snackNotifier(
          "Registered successfully. We have sent an email with instructions to activate your account.",
          "success",
          "top-center"
        );

        setRegistrationData({});
        setValidationErrors({});
        navigate("/verify_email");
      })
      .catch((axiosError) => {
        console.log(axiosError);
        stopLoading();
        if (axiosError?.response?.data) {
          setValidationErrors(axiosError?.response?.data);
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
      });
  };

  return (
    <div className="flex fixed inset-0 justify-center overflow-y-scroll">
      <Container maxWidth="xs" className={`px-4 m-4`}>
        <div className="flex justify-center py-8">
          <AppName />
        </div>
        <Typography className="text-center" component="h1" variant="h5">
          Sign up
        </Typography>

        <form onSubmit={handleAccountCreation} className="grid gap-4 mt-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                sx={styles.textField}
                autoComplete="name"
                name="first_name"
                variant="outlined"
                required
                fullWidth
                error={Boolean(validationErrors["first_name"])}
                id="first_name"
                label="First Name"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="First Name" edge="end">
                        <Person4Outlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={registrationData.first_name || ""}
                onChange={handleRegistrationDataChange}
              />
              <ValidationErrors
                errorsKey="first_name"
                errors={validationErrors}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={styles.textField}
                autoComplete="name"
                name="last_name"
                variant="outlined"
                required
                fullWidth
                error={Boolean(validationErrors["last_name"])}
                id="last_name"
                label="Last Name"
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="Last Name" edge="end">
                        <Person4Outlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={registrationData.last_name || ""}
                onChange={handleRegistrationDataChange}
              />
              <ValidationErrors
                errorsKey="last_name"
                errors={validationErrors}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={styles.textField}
                variant="outlined"
                required
                fullWidth
                error={Boolean(validationErrors["email"])}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={registrationData.email || ""}
                onChange={handleRegistrationDataChange}
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
              <ValidationErrors errorsKey="email" errors={validationErrors} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={styles.textField}
                variant="outlined"
                required
                fullWidth
                error={Boolean(validationErrors["phone_number"])}
                id="phone_number"
                label="Phone Number e.g. 254XXXXXXXXX"
                name="phone_number"
                autoComplete="phone_number"
                value={registrationData.phone_number || ""}
                onChange={handleRegistrationDataChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="phone number" edge="end">
                        <PhoneEnabledOutlined />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ValidationErrors
                errorsKey="phone_number"
                errors={validationErrors}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={styles.textField}
                variant="outlined"
                required
                fullWidth
                error={Boolean(validationErrors["password"])}
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={registrationData.password || ""}
                onChange={handleRegistrationDataChange}
                type={showPassword ? "text" : "password"}
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
              <ValidationErrors
                errorsKey="password"
                errors={validationErrors}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                sx={styles.textField}
                required
                fullWidth
                error={Boolean(validationErrors["password_confirmation"])}
                name="password_confirmation"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="password_confirmation"
                autoComplete="current-password"
                value={registrationData.password_confirmation || ""}
                onChange={handleRegistrationDataChange}
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
              <ValidationErrors
                errorsKey="password_confirmation"
                errors={validationErrors}
              />
            </Grid>
          </Grid>

          <Grid container>
            <div className="flex items-start">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => setagree(!agree)}
                    checked={agree}
                    sx={styles.customCheckbox}
                  />
                }
              />
              <div>
                I agree to the{" "}
                <NavLink
                  className="hover:text-purple-800 text-purple-600 text-center mx-auto"
                  to="/forgotpassword"
                  variant="body2"
                >
                  Terms of Service
                </NavLink>{" "}
                and{" "}
                <NavLink
                  className="hover:text-purple-800 text-purple-600 text-center mx-auto"
                  to="/forgotpassword"
                  variant="body2"
                >
                  Privacy Policy
                </NavLink>
              </div>
            </div>
          </Grid>
          <Button
            disabled={!agree}
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
              to="/login"
              variant="body2"
            >
              Already have an account? Sign in
            </NavLink>
          </Grid>
        </form>

        <Or className="mt-4" />

        <div className="my-4">
          <button className="flex items-center gap-2 rounded-md justify-center w-full py-2 border-1 hover:text-purple-700 hover:border-purple-700 duration-300">
            <Google />
            Continue with google
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
