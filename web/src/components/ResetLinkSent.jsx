import React from "react";
import AppName from "./common/AppName";
import { Container, Typography } from "@mui/material";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

function ResetLinkSent() {
  return (
    <div className="flex fixed inset-0 justify-center items-center">
      <div className={`px-4 m-4 flex flex-col items-center max-w-[20rem]`}>
        <div className="flex justify-center pb-8">
          <AppName />
        </div>
        <div className="flex justify-center mb-2 text-purple-700">
          <CheckBadgeIcon height={32} />
        </div>
        <div className="mb-6">
          <Typography className="text-center" variant="h5">
            Reset link sent
          </Typography>
        </div>

        <Typography className="text-center" variant="div">
          Check your email for the reset password link.
        </Typography>

        <button className="my-4 flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300">
          Open email app
        </button>

        <Typography className="text-center" variant="div">
          If you don't see your reset password email link, please check your
          spam folder inside your mail
        </Typography>
      </div>
    </div>
  );
}

export default ResetLinkSent;
