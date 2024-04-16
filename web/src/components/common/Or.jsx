import React from "react";

function Or({ className }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="border-t border-gray-300 flex-1"></div>
      <p className="text-option text-gray-500 px-3">Or</p>
      <div className="border-t border-gray-300 flex-1"></div>
    </div>
  );
}

export default Or;
