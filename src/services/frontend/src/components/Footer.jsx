import React from "react";
import { Typography } from "@material-tailwind/react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-blue-gray-100 py-4 px-6 text-center fixed bottom-0 left-0">
      <Typography variant="small" className="text-blue-gray-600">
        &copy; {new Date().getFullYear()} FONQP, IIT Kharagpur
      </Typography>
    </footer>
  );
}
