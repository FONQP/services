import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { services } from "../data/Services";
import Footer from "../components/Footer";

export default function Home() {
  const userType = localStorage.getItem("userType");

  const visibleServices = services.filter(({ auth }) => {
    if (auth === "all") return true;
    if (auth === "internal" && (userType === "admin" || userType === "internal")) return true;
    return false;
  });

  return (
    <div className="fixed top-[64px] left-0 right-0 bottom-0 overflow-hidden">
      <div className="w-full h-full flex flex-col">
        {/* Main content scrollable area */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center items-start">
          <div
            className={`grid gap-8 sm:grid-cols-2 ${visibleServices.length === 1
                ? "lg:grid-cols-1"
                : visibleServices.length === 2
                  ? "lg:grid-cols-2"
                  : visibleServices.length === 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-4"
              }`}
          >
            {visibleServices.map(({ title, description, link, logo, action, color }) => (
              <Card key={title} className="w-80">
                <CardHeader className="relative h-40 bg-transparent shadow-none">
                  <img
                    src={logo}
                    alt={title}
                    className="object-contain h-full w-full p-4"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="text-sm">{description}</Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <a href={link}>
                    <Button fullWidth className={`${color}`}>{action}</Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </div>

  );
}
