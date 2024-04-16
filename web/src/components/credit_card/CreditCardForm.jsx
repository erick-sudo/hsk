import React, { useContext, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { ValidationErrors } from "../common/ValidationErrors";
import { AppContext } from "../context/AppContext";
import { axiosPost } from "../../lib/axiosLib";
import { apis } from "../../lib/apis";

const styles = {
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

const CreditCardForm = ({
  initial,
  disabled = false,
  afterSuccess = () => {},
}) => {
  const initalState = {
    cardholder_name: initial?.cardholder_name || "",
    card_number: initial?.card_number || "",
    cvv: initial?.cvv || "",
    expiration_date: initial?.expiration_date,
  };
  const [errors, setErrors] = useState({});
  const { startLoading, stopLoading, snackNotifier } = useContext(AppContext);
  const [formData, setFormData] = useState({
    ...initalState,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startLoading();
    axiosPost(apis.credit_cards.create, {
      ...formData,
    })
      .then((response) => {
        stopLoading();
        snackNotifier(response.data.message, "success", "top-center");
        setFormData({});
        setErrors({});
        if (typeof afterSuccess === "function") {
          afterSuccess();
        }
      })
      .catch((axiosError) => {
        stopLoading();
        if (axiosError.response.status === 409) {
          snackNotifier(
            axiosError.response.data.detail.message,
            "warning",
            "top-center"
          );
          if (typeof afterSuccess === "function") {
            afterSuccess();
          }
        } else if (axiosError.code === "ERR_BAD_REQUEST") {
          setErrors(axiosError.response.data);
        } else {
          snackNotifier(axiosError.message, "error", "top-center");
        }
        console.log(axiosError);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            disabled={disabled}
            required
            onChange={handleChange}
            value={formData.card_number || ""}
            sx={{
              ...styles.textField,
            }}
            fullWidth
            type="tel"
            label="Credit card number"
            name="card_number"
            variant="filled"
          />
          <ValidationErrors errors={errors} errorsKey="card_number" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={disabled}
            required
            onChange={handleChange}
            value={formData.expiration_date || ""}
            sx={{
              ...styles.textField,
            }}
            fullWidth
            type="tel"
            label="Expiry date"
            name="expiration_date"
            variant="filled"
          />
          <ValidationErrors errors={errors} errorsKey="expiration_date" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled={disabled}
            required
            onChange={handleChange}
            value={formData.cvv || ""}
            sx={{
              ...styles.textField,
            }}
            fullWidth
            type="tel"
            label="CVV"
            name="cvv"
            variant="filled"
          />
          <ValidationErrors errors={errors} errorsKey="cvv" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={disabled}
            required
            onChange={handleChange}
            value={formData.cardholder_name || ""}
            sx={{
              ...styles.textField,
            }}
            fullWidth
            variant="filled"
            type="text"
            label="Name on Card"
            placeholder="J Smith"
            name="cardholder_name"
          />
          <ValidationErrors errors={errors} errorsKey="cardholder_name" />
        </Grid>
        {!disabled && (
          <div className="pt-4 flex justify-end w-full">
            <button
              className="disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
              type="submit"
            >
              Create
            </button>
          </div>
        )}
      </Grid>
    </form>
  );
};

export default CreditCardForm;
