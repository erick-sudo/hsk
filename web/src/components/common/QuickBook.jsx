import { CalendarMonthOutlined } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";

const styles = {
  submit: {
    backgroundColor: "rgb(71, 3, 131)",
    "&:hover": {
      backgroundColor: "rgb(148, 77, 211)",
    },
  },
};

function QuickBook({ className }) {
  return (
    <ButtonGroup variant="outlined" className={`shadow ${className}`} fullWidth>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
        }}
      >
        Bedroom
      </Button>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
        }}
      >
        Bathroom
      </Button>
      <Button
        variant="text"
        sx={{
          textTransform: "none",
        }}
      >
        Standard
      </Button>
      <Button
        variant="contained"
        startIcon={<CalendarMonthOutlined />}
        sx={{
          textTransform: "none",
          ...styles.submit,
        }}
      >
        Book Schedule
      </Button>
    </ButtonGroup>
  );
}

export default QuickBook;
