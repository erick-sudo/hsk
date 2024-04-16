import { AutoAwesome } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppName() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="font-extrabold cursor-pointer text-2xl relative h-16 flex items-end p-2"
    >
      Sparkle<span className="text-purple-600">Sync</span>
      <span className="absolute bottom-[50%] left-8 text-purple-600">
        <AutoAwesome />
      </span>
    </div>
  );
}
